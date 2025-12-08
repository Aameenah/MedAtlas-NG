
import { Doctor, Appointment, Facility, Review } from './types';

export const LOCATIONS = [
  "All Locations",
  "Tanke",
  "GRA",
  "Taiwo",
  "Unilorin Road",
  "Offa Garage",
  "Fate"
];

export const SPECIALTIES = [
  "All Specialties",
  "General Practitioner",
  "Dermatologist",
  "Pediatrician",
  "Dentist",
  "ENT Consultant",
  "Cardiologist",
  "Gynecologist",
  "Orthopedic Surgeon"
];

// Helper to generate consistent service names for the mock data
const SERVICES_MAP = {
  "General Practitioner": { name: "General Consultation", price: 5000 },
  "Dermatologist": { name: "Dermatology Screening", price: 12000 },
  "Pediatrician": { name: "Pediatric Care", price: 7000 },
  "Dentist": { name: "Dental Checkup", price: 10000 },
  "ENT Consultant": { name: "ENT Therapy", price: 15000 },
  "Cardiologist": { name: "Cardiology Screening", price: 25000 },
  "Gynecologist": { name: "Antenatal Care", price: 8000 },
  "Orthopedic Surgeon": { name: "Orthopedic Assessment", price: 18000 }
};

export const MOCK_FACILITIES: Facility[] = [
  // --- TANKE ---
  {
    id: "f_tanke_1",
    name: "Tanke General Hospital",
    location: "Tanke",
    address: "15 University Road, Tanke",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    reviews: 210,
    description: "A community-focused hospital providing comprehensive primary and secondary care.",
    openingHours: "24/7",
    services: [
      { id: "s_tanke_1_1", ...SERVICES_MAP["General Practitioner"] },
      { id: "s_tanke_1_2", ...SERVICES_MAP["Pediatrician"] },
      { id: "s_tanke_1_3", ...SERVICES_MAP["Gynecologist"] },
      { id: "s_tanke_1_4", ...SERVICES_MAP["Dentist"] }
    ]
  },
  {
    id: "f_tanke_2",
    name: "Tanke Specialist Hub",
    location: "Tanke",
    address: "Opposite Chapel, Tanke",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 85,
    description: "Advanced specialist care center focusing on chronic conditions and surgery.",
    openingHours: "Mon - Sat: 9am - 6pm",
    services: [
      { id: "s_tanke_2_1", ...SERVICES_MAP["Cardiologist"] },
      { id: "s_tanke_2_2", ...SERVICES_MAP["Orthopedic Surgeon"] },
      { id: "s_tanke_2_3", ...SERVICES_MAP["Dermatologist"] },
      { id: "s_tanke_2_4", ...SERVICES_MAP["ENT Consultant"] }
    ]
  },

  // --- GRA ---
  {
    id: "f_gra_1",
    name: "Elite Medical Centre GRA",
    location: "GRA",
    address: "12 Unity Road, GRA",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 320,
    description: "Premier healthcare facility offering luxury amenities and top-tier specialists.",
    openingHours: "Mon - Sat: 8am - 8pm",
    services: [
      { id: "s_gra_1_1", ...SERVICES_MAP["Cardiologist"] },
      { id: "s_gra_1_2", ...SERVICES_MAP["Dermatologist"] },
      { id: "s_gra_1_3", ...SERVICES_MAP["Dentist"] },
      { id: "s_gra_1_4", ...SERVICES_MAP["ENT Consultant"] }
    ]
  },
  {
    id: "f_gra_2",
    name: "GRA Family Clinic",
    location: "GRA",
    address: "5 Revenue Road, GRA",
    image: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 150,
    description: "Family-oriented clinic specializing in maternal and child health.",
    openingHours: "24/7",
    services: [
      { id: "s_gra_2_1", ...SERVICES_MAP["General Practitioner"] },
      { id: "s_gra_2_2", ...SERVICES_MAP["Pediatrician"] },
      { id: "s_gra_2_3", ...SERVICES_MAP["Gynecologist"] },
      { id: "s_gra_2_4", ...SERVICES_MAP["Orthopedic Surgeon"] }
    ]
  },

  // --- TAIWO ---
  {
    id: "f_taiwo_1",
    name: "KWASUTH (Teaching Hospital)",
    location: "Taiwo",
    address: "General Hospital Road, Taiwo Isale",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b9af923?auto=format&fit=crop&q=80&w=800",
    rating: 4.3,
    reviews: 500,
    description: "The state's leading teaching hospital with a full range of medical departments.",
    openingHours: "24/7 Emergency",
    services: [
      { id: "s_taiwo_1_1", ...SERVICES_MAP["Cardiologist"] },
      { id: "s_taiwo_1_2", ...SERVICES_MAP["Orthopedic Surgeon"] },
      { id: "s_taiwo_1_3", ...SERVICES_MAP["General Practitioner"] },
      { id: "s_taiwo_1_4", ...SERVICES_MAP["Gynecologist"] }
    ]
  },
  {
    id: "f_taiwo_2",
    name: "Taiwo City Clinic",
    location: "Taiwo",
    address: "45 Taiwo Road",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0929519?auto=format&fit=crop&q=80&w=800",
    rating: 4.4,
    reviews: 98,
    description: "Accessible city clinic for quick consultations and therapy.",
    openingHours: "Mon - Sat: 8am - 6pm",
    services: [
      { id: "s_taiwo_2_1", ...SERVICES_MAP["Dentist"] },
      { id: "s_taiwo_2_2", ...SERVICES_MAP["ENT Consultant"] },
      { id: "s_taiwo_2_3", ...SERVICES_MAP["Dermatologist"] },
      { id: "s_taiwo_2_4", ...SERVICES_MAP["Pediatrician"] }
    ]
  },

  // --- UNILORIN ROAD ---
  {
    id: "f_uni_1",
    name: "Campus View Medical",
    location: "Unilorin Road",
    address: "Km 5 Unilorin Road",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    rating: 4.2,
    reviews: 230,
    description: "Serving the academic community with affordable and quality care.",
    openingHours: "Mon - Fri: 8am - 8pm",
    services: [
      { id: "s_uni_1_1", ...SERVICES_MAP["General Practitioner"] },
      { id: "s_uni_1_2", ...SERVICES_MAP["Dentist"] },
      { id: "s_uni_1_3", ...SERVICES_MAP["Dermatologist"] },
      { id: "s_uni_1_4", ...SERVICES_MAP["Gynecologist"] }
    ]
  },
  {
    id: "f_uni_2",
    name: "Academic Specialist Centre",
    location: "Unilorin Road",
    address: "Challenge Area, Unilorin Rd",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 65,
    description: "Consultant-led clinic focusing on specialized referrals.",
    openingHours: "By Appointment",
    services: [
      { id: "s_uni_2_1", ...SERVICES_MAP["Cardiologist"] },
      { id: "s_uni_2_2", ...SERVICES_MAP["Orthopedic Surgeon"] },
      { id: "s_uni_2_3", ...SERVICES_MAP["ENT Consultant"] },
      { id: "s_uni_2_4", ...SERVICES_MAP["Pediatrician"] }
    ]
  },

  // --- OFFA GARAGE ---
  {
    id: "f_offa_1",
    name: "Southern City Hospital",
    location: "Offa Garage",
    address: "Near Bekandims, Offa Garage",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800",
    rating: 4.4,
    reviews: 112,
    description: "Full service hospital with maternity and surgical wings.",
    openingHours: "24/7",
    services: [
      { id: "s_offa_1_1", ...SERVICES_MAP["Gynecologist"] },
      { id: "s_offa_1_2", ...SERVICES_MAP["Orthopedic Surgeon"] },
      { id: "s_offa_1_3", ...SERVICES_MAP["General Practitioner"] },
      { id: "s_offa_1_4", ...SERVICES_MAP["Pediatrician"] }
    ]
  },
  {
    id: "f_offa_2",
    name: "Offa Garage Dental & Eye",
    location: "Offa Garage",
    address: "Block 4, Offa Garage Road",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 45,
    description: "Specialized clinic for dental and ENT services.",
    openingHours: "Mon - Sat: 9am - 5pm",
    services: [
      { id: "s_offa_2_1", ...SERVICES_MAP["Dentist"] },
      { id: "s_offa_2_2", ...SERVICES_MAP["ENT Consultant"] },
      { id: "s_offa_2_3", ...SERVICES_MAP["Dermatologist"] },
      { id: "s_offa_2_4", ...SERVICES_MAP["Cardiologist"] }
    ]
  },

  // --- FATE ---
  {
    id: "f_fate_1",
    name: "Fate Community Clinic",
    location: "Fate",
    address: "Fate Roundabout Area",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800",
    rating: 4.3,
    reviews: 180,
    description: "Accessible care for the Fate community.",
    openingHours: "Mon - Sat: 8am - 8pm",
    services: [
      { id: "s_fate_1_1", ...SERVICES_MAP["General Practitioner"] },
      { id: "s_fate_1_2", ...SERVICES_MAP["Pediatrician"] },
      { id: "s_fate_1_3", ...SERVICES_MAP["Dentist"] },
      { id: "s_fate_1_4", ...SERVICES_MAP["Gynecologist"] }
    ]
  },
  {
    id: "f_fate_2",
    name: "Harmony Advanced Care",
    location: "Fate",
    address: "Basin Road, Fate",
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 92,
    description: "Premium outpatient services for specialized needs.",
    openingHours: "Mon - Fri: 9am - 5pm",
    services: [
      { id: "s_fate_2_1", ...SERVICES_MAP["Dermatologist"] },
      { id: "s_fate_2_2", ...SERVICES_MAP["Cardiologist"] },
      { id: "s_fate_2_3", ...SERVICES_MAP["ENT Consultant"] },
      { id: "s_fate_2_4", ...SERVICES_MAP["Orthopedic Surgeon"] }
    ]
  }
];

// Helper to assign a doctor to every facility
const generateDoctors = () => {
  const doctors: Doctor[] = [];
  MOCK_FACILITIES.forEach(facility => {
    facility.services.forEach((service, index) => {
      // Find the specialty key matching this service name
      const specialtyKey = Object.keys(SERVICES_MAP).find(key => SERVICES_MAP[key].name === service.name) || "General Practitioner";
      
      doctors.push({
        id: `doc_${facility.id}_${index}`,
        name: `Dr. ${['Ade', 'Olu', 'Chi', 'Ibrahim', 'Fatima', 'Ngozi', 'Musa', 'Zainab'][index % 8]} ${['Bello', 'Okeke', 'Aliyu', 'Johnson', 'Suleiman', 'Coker'][facility.id.length % 6]}`,
        specialty: specialtyKey,
        hospital: facility.name,
        facilityId: facility.id,
        location: facility.location,
        price: service.price,
        rating: 4.0 + (Math.random()),
        reviews: Math.floor(Math.random() * 100) + 20,
        verified: true,
        image: `https://images.unsplash.com/photo-${['1612349317150-e413f6a5b16d', '1622253692010-333f2da6031d', '1594824476969-51c44d7eccca', '1637059824897-5124445f9094'][index % 4]}?auto=format&fit=crop&q=80&w=200`,
        description: `Experienced ${specialtyKey} dedicated to providing quality patient care at ${facility.name}.`,
        availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"].slice(index % 3, (index % 3) + 3)
      });
    });
  });
  return doctors;
};

export const MOCK_DOCTORS: Doctor[] = generateDoctors();

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "A1", patientName: "Funke Akindele", doctorName: "Dr. Bello", hospitalName: "Elite Medical Centre GRA", facilityId: "f_gra_1", serviceName: "ENT Therapy", price: 15000, time: "09:00 AM", date: "Today", status: "confirmed", paymentStatus: "paid" },
  { id: "A2", patientName: "John Doe", doctorName: "Dr. Aliyu", hospitalName: "KWASUTH", facilityId: "f_taiwo_1", serviceName: "Cardiology Screening", price: 25000, time: "10:30 AM", date: "Today", status: "confirmed", paymentStatus: "paid" },
  { id: "A3", patientName: "Sarah Smith", doctorName: "Dr. Coker", hospitalName: "Tanke Specialist Hub", facilityId: "f_tanke_2", serviceName: "Dermatology Screening", price: 12000, time: "01:00 PM", date: "Today", status: "pending", paymentStatus: "unpaid" },
  // A completed appointment for testing reviews
  { id: "A4", patientName: "Guest User", doctorName: "Dr. Fatima Suleiman", hospitalName: "Tanke General Hospital", facilityId: "f_tanke_1", serviceName: "Pediatric Care", price: 7000, time: "2:00 PM", date: "Yesterday", status: "completed", paymentStatus: "paid", reviewed: false }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    facilityId: "f_tanke_1",
    patientName: "Amina B.",
    rating: 5,
    comment: "Very clean environment and Dr. Fatima was excellent with my child.",
    date: "2 days ago"
  },
  {
    id: "r2",
    facilityId: "f_tanke_1",
    patientName: "Tunde O.",
    rating: 4,
    comment: "Good service but the waiting time was a bit long.",
    date: "1 week ago"
  },
  {
    id: "r3",
    facilityId: "f_gra_1",
    patientName: "Sarah J.",
    rating: 5,
    comment: "World class facility in Ilorin. Worth every naira.",
    date: "3 weeks ago"
  }
];
