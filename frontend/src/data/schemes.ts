export interface Scheme {
  id: string;
  name: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  type: 'central' | 'state';
  matchPercentage: number;
  eligibility: {
    en: string[];
    hi: string[];
  };
  benefits: {
    en: string[];
    hi: string[];
  };
  documents: {
    en: string[];
    hi: string[];
  };
  howToApply: {
    en: string[];
    hi: string[];
  };
  applyLink: string;
}

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: {
      en: 'PM-KISAN Samman Nidhi',
      hi: 'पीएम-किसान सम्मान निधि',
    },
    description: {
      en: 'Financial assistance of ₹6,000 per year to farmer families for agricultural needs.',
      hi: 'कृषि आवश्यकताओं के लिए किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता।',
    },
    type: 'central',
    matchPercentage: 95,
    eligibility: {
      en: [
        'Must be a small or marginal farmer',
        'Should own cultivable land',
        'Annual family income should be below ₹2 lakh',
        'Must have valid Aadhaar card',
      ],
      hi: [
        'छोटे या सीमांत किसान होना चाहिए',
        'खेती योग्य भूमि का मालिक होना चाहिए',
        'वार्षिक पारिवारिक आय ₹2 लाख से कम होनी चाहिए',
        'वैध आधार कार्ड होना चाहिए',
      ],
    },
    benefits: {
      en: [
        '₹6,000 per year in three installments',
        'Direct transfer to bank account',
        'No middleman involved',
      ],
      hi: [
        'तीन किस्तों में प्रति वर्ष ₹6,000',
        'बैंक खाते में सीधे ट्रांसफर',
        'कोई बिचौलिया नहीं',
      ],
    },
    documents: {
      en: [
        'Aadhaar Card',
        'Land ownership documents',
        'Bank account details',
        'Mobile number',
      ],
      hi: [
        'आधार कार्ड',
        'भूमि स्वामित्व दस्तावेज',
        'बैंक खाता विवरण',
        'मोबाइल नंबर',
      ],
    },
    howToApply: {
      en: [
        'Visit the PM-KISAN portal or your nearest CSC center',
        'Fill in your personal and land details',
        'Upload required documents',
        'Submit the application',
        'Track your application status online',
      ],
      hi: [
        'पीएम-किसान पोर्टल या नजदीकी CSC केंद्र पर जाएं',
        'अपना व्यक्तिगत और भूमि विवरण भरें',
        'आवश्यक दस्तावेज अपलोड करें',
        'आवेदन जमा करें',
        'ऑनलाइन अपने आवेदन की स्थिति देखें',
      ],
    },
    applyLink: 'https://pmkisan.gov.in/',
  },
  {
    id: 'ayushman-bharat',
    name: {
      en: 'Ayushman Bharat - PMJAY',
      hi: 'आयुष्मान भारत - पीएमजेएवाई',
    },
    description: {
      en: 'Health insurance cover of ₹5 lakh per family per year for secondary and tertiary care.',
      hi: 'द्वितीयक और तृतीयक देखभाल के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा।',
    },
    type: 'central',
    matchPercentage: 88,
    eligibility: {
      en: [
        'Family should be listed in SECC database',
        'No income criteria but must be economically weaker section',
        'Both rural and urban families eligible',
        'No age limit',
      ],
      hi: [
        'परिवार SECC डेटाबेस में सूचीबद्ध होना चाहिए',
        'कोई आय मानदंड नहीं लेकिन आर्थिक रूप से कमजोर वर्ग होना चाहिए',
        'ग्रामीण और शहरी दोनों परिवार पात्र',
        'कोई आयु सीमा नहीं',
      ],
    },
    benefits: {
      en: [
        '₹5 lakh health coverage per year',
        'Cashless treatment at empanelled hospitals',
        'Pre and post hospitalization expenses covered',
        'All family members covered',
      ],
      hi: [
        'प्रति वर्ष ₹5 लाख स्वास्थ्य कवरेज',
        'सूचीबद्ध अस्पतालों में कैशलेस उपचार',
        'अस्पताल में भर्ती होने से पहले और बाद के खर्च कवर',
        'सभी परिवार के सदस्य कवर',
      ],
    },
    documents: {
      en: [
        'Aadhaar Card',
        'Ration Card',
        'Family photo',
        'Mobile number',
      ],
      hi: [
        'आधार कार्ड',
        'राशन कार्ड',
        'परिवार का फोटो',
        'मोबाइल नंबर',
      ],
    },
    howToApply: {
      en: [
        'Check eligibility on mera.pmjay.gov.in',
        'Visit nearest Ayushman Bharat Mitra at CSC or hospital',
        'Provide Aadhaar and ration card details',
        'Get your Ayushman card printed',
        'Use the card for treatment at any empanelled hospital',
      ],
      hi: [
        'mera.pmjay.gov.in पर पात्रता जांचें',
        'CSC या अस्पताल में निकटतम आयुष्मान भारत मित्र से मिलें',
        'आधार और राशन कार्ड विवरण प्रदान करें',
        'अपना आयुष्मान कार्ड प्रिंट करवाएं',
        'किसी भी सूचीबद्ध अस्पताल में इलाज के लिए कार्ड का उपयोग करें',
      ],
    },
    applyLink: 'https://pmjay.gov.in/',
  },
  {
    id: 'pm-awas-yojana',
    name: {
      en: 'PM Awas Yojana (Urban)',
      hi: 'प्रधानमंत्री आवास योजना (शहरी)',
    },
    description: {
      en: 'Affordable housing scheme providing financial assistance to build or buy a home.',
      hi: 'घर बनाने या खरीदने के लिए वित्तीय सहायता प्रदान करने वाली किफायती आवास योजना।',
    },
    type: 'central',
    matchPercentage: 72,
    eligibility: {
      en: [
        'EWS/LIG/MIG category families',
        'Should not own a pucca house',
        'Annual household income criteria based on category',
        'Woman should be co-owner of the property',
      ],
      hi: [
        'EWS/LIG/MIG श्रेणी के परिवार',
        'पक्के घर का मालिक नहीं होना चाहिए',
        'श्रेणी के आधार पर वार्षिक घरेलू आय मानदंड',
        'महिला संपत्ति की सह-मालिक होनी चाहिए',
      ],
    },
    benefits: {
      en: [
        'Interest subsidy on home loans up to ₹2.67 lakh',
        'Assistance for constructing new house',
        'Support for slum rehabilitation',
      ],
      hi: [
        'होम लोन पर ₹2.67 लाख तक ब्याज सब्सिडी',
        'नया घर बनाने के लिए सहायता',
        'स्लम पुनर्वास के लिए सहायता',
      ],
    },
    documents: {
      en: [
        'Aadhaar Card',
        'Income certificate',
        'Bank account details',
        'Property documents (if applicable)',
        'Affidavit of not owning a pucca house',
      ],
      hi: [
        'आधार कार्ड',
        'आय प्रमाण पत्र',
        'बैंक खाता विवरण',
        'संपत्ति दस्तावेज (यदि लागू हो)',
        'पक्के घर का मालिक न होने का शपथ पत्र',
      ],
    },
    howToApply: {
      en: [
        'Visit pmaymis.gov.in or your city municipal office',
        'Fill the online application form',
        'Upload required documents',
        'Submit and note the application ID',
        'Track status using the application ID',
      ],
      hi: [
        'pmaymis.gov.in या अपने शहर के नगर निगम कार्यालय जाएं',
        'ऑनलाइन आवेदन पत्र भरें',
        'आवश्यक दस्तावेज अपलोड करें',
        'जमा करें और आवेदन आईडी नोट करें',
        'आवेदन आईडी का उपयोग करके स्थिति ट्रैक करें',
      ],
    },
    applyLink: 'https://pmaymis.gov.in/',
  },
  {
    id: 'mudra-yojana',
    name: {
      en: 'PM Mudra Yojana',
      hi: 'प्रधानमंत्री मुद्रा योजना',
    },
    description: {
      en: 'Loans up to ₹10 lakh for small businesses without collateral.',
      hi: 'छोटे व्यवसायों के लिए बिना गारंटी के ₹10 लाख तक का ऋण।',
    },
    type: 'central',
    matchPercentage: 65,
    eligibility: {
      en: [
        'Any Indian citizen with business plan',
        'Non-farm income generating activities',
        'Manufacturing, trading or service sector',
        'No collateral required',
      ],
      hi: [
        'व्यवसाय योजना वाला कोई भी भारतीय नागरिक',
        'गैर-कृषि आय उत्पन्न करने वाली गतिविधियां',
        'विनिर्माण, व्यापार या सेवा क्षेत्र',
        'कोई गारंटी आवश्यक नहीं',
      ],
    },
    benefits: {
      en: [
        'Shishu: Loans up to ₹50,000',
        'Kishore: Loans from ₹50,001 to ₹5 lakh',
        'Tarun: Loans from ₹5 lakh to ₹10 lakh',
        'No processing fee',
      ],
      hi: [
        'शिशु: ₹50,000 तक का ऋण',
        'किशोर: ₹50,001 से ₹5 लाख तक का ऋण',
        'तरुण: ₹5 लाख से ₹10 लाख तक का ऋण',
        'कोई प्रोसेसिंग शुल्क नहीं',
      ],
    },
    documents: {
      en: [
        'Identity proof (Aadhaar/Voter ID)',
        'Address proof',
        'Business plan or proposal',
        'Passport size photos',
        'Quotation of items to be purchased',
      ],
      hi: [
        'पहचान प्रमाण (आधार/वोटर आईडी)',
        'पते का प्रमाण',
        'व्यवसाय योजना या प्रस्ताव',
        'पासपोर्ट साइज फोटो',
        'खरीदी जाने वाली वस्तुओं का कोटेशन',
      ],
    },
    howToApply: {
      en: [
        'Prepare a business plan',
        'Visit any bank, NBFC, or MFI',
        'Fill the Mudra loan application form',
        'Submit required documents',
        'Loan will be sanctioned after verification',
      ],
      hi: [
        'व्यवसाय योजना तैयार करें',
        'किसी भी बैंक, NBFC या MFI में जाएं',
        'मुद्रा ऋण आवेदन पत्र भरें',
        'आवश्यक दस्तावेज जमा करें',
        'सत्यापन के बाद ऋण मंजूर होगा',
      ],
    },
    applyLink: 'https://www.mudra.org.in/',
  },
  {
    id: 'sukanya-samriddhi',
    name: {
      en: 'Sukanya Samriddhi Yojana',
      hi: 'सुकन्या समृद्धि योजना',
    },
    description: {
      en: 'Savings scheme for girl child education and marriage with high interest rate.',
      hi: 'बालिका शिक्षा और विवाह के लिए उच्च ब्याज दर वाली बचत योजना।',
    },
    type: 'central',
    matchPercentage: 80,
    eligibility: {
      en: [
        'Girl child below 10 years of age',
        'Only 2 accounts per family',
        'Account opened by parent or legal guardian',
        'Indian resident',
      ],
      hi: [
        '10 वर्ष से कम आयु की बालिका',
        'प्रति परिवार केवल 2 खाते',
        'माता-पिता या कानूनी अभिभावक द्वारा खाता खोला गया',
        'भारतीय निवासी',
      ],
    },
    benefits: {
      en: [
        'High interest rate (8.2% currently)',
        'Tax benefits under 80C',
        'Partial withdrawal after age 18',
        'Maturity after 21 years',
      ],
      hi: [
        'उच्च ब्याज दर (वर्तमान में 8.2%)',
        '80C के तहत कर लाभ',
        '18 वर्ष की आयु के बाद आंशिक निकासी',
        '21 वर्षों बाद परिपक्वता',
      ],
    },
    documents: {
      en: [
        'Birth certificate of girl child',
        'Parent/Guardian Aadhaar and PAN',
        'Address proof',
        'Passport size photos',
      ],
      hi: [
        'बालिका का जन्म प्रमाण पत्र',
        'माता-पिता/अभिभावक का आधार और पैन',
        'पते का प्रमाण',
        'पासपोर्ट साइज फोटो',
      ],
    },
    howToApply: {
      en: [
        'Visit any post office or authorized bank',
        'Fill the account opening form',
        'Submit KYC documents',
        'Make initial deposit (min ₹250)',
        'Receive passbook',
      ],
      hi: [
        'किसी भी डाकघर या अधिकृत बैंक में जाएं',
        'खाता खोलने का फॉर्म भरें',
        'KYC दस्तावेज जमा करें',
        'प्रारंभिक जमा करें (न्यूनतम ₹250)',
        'पासबुक प्राप्त करें',
      ],
    },
    applyLink: 'https://www.indiapost.gov.in/',
  },
];
