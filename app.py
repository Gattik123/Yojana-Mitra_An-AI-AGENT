"""
Streamlit Web Interface for Government Scheme Finder
Run with: streamlit run app.py
"""

import streamlit as st
import json
import os
from scheme_finder_agents import (
    SchemeFinderOrchestrator,
    UserProfile,
    create_sample_user_profile
)

# Page configuration
st.set_page_config(
    page_title="Yojna Mitra",
    page_icon="🏛️",
    layout="wide",
    initial_sidebar_state="expanded"
)


# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        text-align: center;
        padding: 1.5rem;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        margin-bottom: 2rem;
    }
    .profile-summary {
        background-color: navy-blue;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid #1f77b4;
        margin-bottom: 1rem;
    }
    .scheme-card {
        background-color: #f8f9fa;
        padding: 1.2rem;
        border-radius: 8px;
        border-left: 4px solid #28a745;
        margin-bottom: 1rem;
    }
    .doc-tag {
        background-color: #ffc107;
        color: #333;
        padding: 0.3rem 0.6rem;
        border-radius: 12px;
        font-size: 0.85rem;
        display: inline-block;
        margin: 0.2rem;
    }
</style>
""", unsafe_allow_html=True)

st.components.v1.html(
    """
    <script>
    // Prevent Streamlit auto-scrolling to focused inputs
    const observer = new MutationObserver(() => {
        const active = document.activeElement;
        if (active && active.tagName === 'TEXTAREA') {
            active.blur();
        }
        if (active && active.tagName === 'INPUT') {
            active.blur();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    </script>
    """,
    height=0,
)




def init_session_state():
    """Initialize session state variables"""
    if 'orchestrator' not in st.session_state:
        st.session_state.orchestrator = None
    if 'user_profile' not in st.session_state:
        st.session_state.user_profile = None
    if 'matched_schemes' not in st.session_state:
        st.session_state.matched_schemes = None
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []
    if 'language' not in st.session_state:
        st.session_state.language = 'Hinglish'


def auto_initialize():
    """Auto-initialize the system"""
    if st.session_state.orchestrator is None:
        # Try environment variable first
        api_key = "AIzaSyCtk6IQH3Vrh777NVQ9woCppta_KFj4uV4"
        
        # If not in env, ask user
        if not api_key:
            with st.sidebar:
                st.warning("⚠️ API Key Required")
                api_key = st.text_input(
                    "Enter Gemini API Key",
                    type="password",
                    help="Get free key from https://makersuite.google.com/app/apikey"
                )
                if st.button("Initialize System"):
                    if api_key:
                        try:
                            schemes_path = 'schemes.json'
                            st.session_state.orchestrator = SchemeFinderOrchestrator(api_key, schemes_path)
                            st.success("✅ System ready!")
                            st.rerun()
                        except Exception as e:
                            st.error(f"Error: {str(e)}")
                    else:
                        st.error("Please enter API key")
            return False
        
        # Initialize with env API key
        try:
            schemes_path = 'schemes.json'
            st.session_state.orchestrator = SchemeFinderOrchestrator(api_key, schemes_path)
        except Exception as e:
            st.error(f"Initialization failed: {str(e)}")
            return False
    
    return True


def get_language_prompt():
    """Get language-specific prompt based on selection"""
    if st.session_state.language == 'Hindi':
        return "कृपया हिंदी में जवाब दें।"
    elif st.session_state.language == 'Hinglish':
        return "Please respond in Hinglish (mix of Hindi and English) for better understanding."
    else:
        return "Please respond in simple English."


def create_user_profile_form():
    """Create form for user profile input"""
    st.subheader("👤 अपने बारे में बताएं / Tell Us About Yourself")
    
    with st.form("profile_form"):
        col1, col2, col3 = st.columns(3)
        
        with col1:
            age = st.number_input("Age (उम्र)", min_value=0, max_value=120, value=30, key="age_input")
            gender = st.selectbox("Gender (लिंग)", ["Male", "Female", "Other"], key="gender_input")
            location_type = st.selectbox("Area (क्षेत्र)", ["Rural (ग्रामीण)", "Urban (शहरी)"], key="location_input")
            
        with col2:
            occupation = st.selectbox(
                "Occupation (पेशा)",
                ["farmer", "student", "business owner", "daily wage worker", 
                 "salaried employee", "unemployed", "retired", "other"],
                key="occupation_input"
            )
            education = st.selectbox(
                "Education (शिक्षा)",
                ["Below 10th", "10th Pass", "12th Pass", "Graduate", "Post Graduate", "Other"],
                key="education_input"
            )
            has_disability = st.checkbox("Have Disability (विकलांगता)", key="disability_input")
            
        with col3:
            income = st.number_input(
                "Annual Income ₹ (वार्षिक आय)", 
                min_value=0, 
                value=100000, 
                step=10000,
                key="income_input"
            )
            family_size = st.number_input(
                "Family Size (परिवार)", 
                min_value=1, 
                max_value=20, 
                value=4,
                key="family_input"
            )
            caste = st.selectbox(
                "Category (श्रेणी)", 
                ["General", "SC", "ST", "OBC", "Prefer not to say"],
                key="caste_input"
            )
        
        col4, col5 = st.columns(2)
        
        with col4:
            has_bank = st.checkbox("Have Bank Account (बैंक खाता)", value=True, key="bank_input")
            owns_house = st.checkbox("Own House (खुद का घर)", key="house_input")
            
        with col5:
            land_ownership = st.number_input(
                "Land Owned (acres)", 
                min_value=0.0, 
                value=0.0, 
                step=0.5,
                key="land_input"
            )
        
        # Submit button
        submitted = st.form_submit_button("🔍 Find My Schemes (मेरी योजनाएं खोजें)", use_container_width=True)
        
        if submitted:
            # Create user profile
            profile = UserProfile(
                age=age,
                income=float(income),
                location_type="rural" if "Rural" in location_type else "urban",
                occupation=occupation.lower(),
                gender=gender.lower(),
                has_bank_account=has_bank,
                caste_category=None if caste == "Prefer not to say" else caste,
                family_size=family_size,
                owns_house=owns_house,
                land_ownership=float(land_ownership),
                education_level=education,
                has_disability=has_disability,
                additional_info={}
            )
            
            st.session_state.user_profile = profile
            
            # Find schemes
            with st.spinner("🔄 AI agents analyzing your profile..."):
                st.session_state.orchestrator.set_user_profile(profile)
                st.session_state.matched_schemes = st.session_state.orchestrator.get_eligible_schemes()
            
            st.success("✅ Analysis complete!")
            st.rerun()


def display_matched_schemes():
    """Display matched schemes"""
    if not st.session_state.matched_schemes:
        return
    
    results = st.session_state.matched_schemes
    
    st.markdown("---")
    
    # Profile summary
    profile = st.session_state.user_profile
    st.markdown(f"""
    <div class="profile-summary">
        <strong>Your Profile:</strong> {profile.age} years, {profile.occupation}, {profile.location_type} area, ₹{profile.income:,} annual income
    </div>
    """, unsafe_allow_html=True)
    
    # Results count
    st.header(f"🎯 {results['total_matched']} Schemes Found")
    
    if results['total_matched'] == 0:
        st.warning("No schemes found matching your exact criteria. Try adjusting your profile details.")
        if st.button("🔄 Update Profile"):
            st.session_state.matched_schemes = None
            st.rerun()
        return
    
    # Sort options
    col1, col2 = st.columns([3, 1])
    with col2:
        if st.button("🔄 Update Profile"):
            st.session_state.matched_schemes = None
            st.rerun()
    
    # Display schemes
    schemes = results['matched_schemes']
    
    for idx, scheme in enumerate(schemes, 1):
        # Confidence indicator
        if scheme['confidence'] >= 90:
            confidence_color = "🟢"
        elif scheme['confidence'] >= 70:
            confidence_color = "🟡"
        else:
            confidence_color = "🟠"
        
        with st.expander(
            f"{confidence_color} **{idx}. {scheme['scheme_name']}** ({scheme['confidence']}% match)",
            expanded=(idx <= 3)
        ):
            col1, col2 = st.columns([2, 1])
            
            with col1:
                st.markdown(f"**Type:** {scheme['scheme_type']}")
                st.markdown(f"**Benefits:** {scheme['benefits']}")
                if scheme['notes']:
                    st.info(f"ℹ️ {', '.join(scheme['notes'])}")
            
            with col2:
                # Simplify button
                if st.button("📖 Simplify", key=f"simp_{scheme['scheme_id']}", use_container_width=True):
                    with st.spinner("Simplifying..."):
                        # Add language preference to the simplification
                        simplified = st.session_state.orchestrator.get_simplified_scheme(scheme['scheme_id'])
                        
                        st.markdown("### 📖 Simple Explanation")
                        st.write(simplified['full_simplified'])
                
                # Application guide button
                if st.button("📝 How to Apply", key=f"guide_{scheme['scheme_id']}", use_container_width=True):
                    with st.spinner("Generating guide..."):
                        guide = st.session_state.orchestrator.get_application_guide(scheme['scheme_id'])
                        
                        st.markdown("### 📝 Application Guide")
                        st.write(guide['guide'])
                        
                        st.markdown("**📄 Documents Needed:**")
                        for doc in guide['documents_needed']:
                            st.markdown(f"<span class='doc-tag'>{doc}</span>", unsafe_allow_html=True)


def chat_interface():
    """Chat interface for queries"""
    st.subheader("💬 Ask Questions (सवाल पूछें)")
    
    # Display chat history
    for message in st.session_state.chat_history:
        with st.chat_message(message["role"]):
            st.write(message["content"])
    
    # Chat input
    if prompt := st.chat_input("Ask about schemes... (योजनाओं के बारे में पूछें)"):
        # Add user message
        st.session_state.chat_history.append({"role": "user", "content": prompt})
        
        # Add language instruction
        language_instruction = get_language_prompt()
        full_prompt = f"{prompt}\n\n{language_instruction}"
        
        # Get AI response
        with st.spinner("Thinking..."):
            response = st.session_state.orchestrator.ask_question(full_prompt)
        
        # Add assistant message
        st.session_state.chat_history.append({"role": "assistant", "content": response})
        
        st.rerun()
    
    # Clear chat button
    if len(st.session_state.chat_history) > 0:
        if st.button("🗑️ Clear Chat"):
            st.session_state.chat_history = []
            st.rerun()


def search_interface():
    """Search interface"""
    st.subheader("🔍 Search Schemes")
    
    keyword = st.text_input(
        "Enter keyword (शब्द दर्ज करें)", 
        placeholder="e.g., farmer, student, housing, pension",
        key="search_input"
    )
    
    if keyword:
        results = st.session_state.orchestrator.search_schemes(keyword)
        st.write(f"**Found {len(results)} schemes matching '{keyword}'**")
        
        for scheme in results[:15]:
            with st.expander(f"**{scheme['scheme_name']}** - {scheme['scheme_type']}"):
                col1, col2 = st.columns([3, 1])
                
                with col1:
                    st.write(f"**Category:** {scheme['category']}")
                    st.write(f"**Benefits:** {scheme['benefits']}")
                    st.write(f"**Eligibility:** {scheme['eligibility']}")
                
                with col2:
                    st.write(f"**Age:** {scheme['age_limit']}")
                    st.write(f"**Income:** {scheme['income_limit']}")


def main():
    """Main application"""
    init_session_state()
    
    # Header
    st.markdown(
        '<div class="main-header">🏛️ Yojna Mitra<br/>योजना मित्र<br/><small>Your AI Guide to Government Schemes</small></div>', 
        unsafe_allow_html=True
    )
    
    # Try to auto-initialize
    if not auto_initialize():
        return
    
    # Sidebar
    with st.sidebar:
        
        
        
        
        # Quick actions
        # st.subheader("🚀 Quick Actions")
        
        # if st.button("📋 Use Sample Profile", use_container_width=True):
        #     sample = create_sample_user_profile()
        #     st.session_state.user_profile = sample
        #     st.session_state.orchestrator.set_user_profile(sample)
        #     st.session_state.matched_schemes = st.session_state.orchestrator.get_eligible_schemes()
        #     st.rerun()
        
        if st.button("🔄 Reset All", use_container_width=True):
            st.session_state.user_profile = None
            st.session_state.matched_schemes = None
            st.session_state.chat_history = []
            st.rerun()
        
        st.markdown("---")
        
        # Chat in sidebar
        st.subheader("💬 Quick Chat")
        chat_quick = st.text_input("Ask a question:", key="sidebar_chat")
        if chat_quick:
            with st.spinner("Thinking..."):
                language_instruction = get_language_prompt()
                response = st.session_state.orchestrator.ask_question(f"{chat_quick}\n\n{language_instruction}")
                st.success(response)
        
        st.markdown("---")
        
        # Search in sidebar
        st.subheader("🔍 Quick Search")
        search_quick = st.text_input("Search schemes:", key="sidebar_search")
        if search_quick:
            results = st.session_state.orchestrator.search_schemes(search_quick)
            st.write(f"Found {len(results)} schemes")
            for scheme in results[:5]:
                st.caption(f"• {scheme['scheme_name']}")
        
        st.markdown("---")
        
        # Info
        st.info("""
        **How it works:**
        1. Fill your profile details
        2. AI finds eligible schemes
        3. Get simple explanations
        4. Learn how to apply
        5. Ask questions anytime
        """)
    
    # Main content area
    if st.session_state.matched_schemes is None:
        # Show profile form
        create_user_profile_form()
    else:
        # Show results
        display_matched_schemes()
        
        # Chat section at bottom
        st.markdown("---")
        chat_interface()


if __name__ == "__main__":
    main()