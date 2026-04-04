import { Injectable } from '@angular/core';
import { DashboardProperty, DashboardUser, DashboardAgent, City, Area, Inquiry, AppNotification } from '../models';

@Injectable({ providedIn: 'root' })
export class MockDataService {

  // ── Properties ──────────────────────────────────────────
  private properties: DashboardProperty[] = [
    { id:1, title:'Luxury Villa in DHA Phase 6', description:'Premium 5-bedroom villa with pool', price:45000000, city:'Lahore', area:'DHA Phase 6', type:'house', purpose:'sale', status:'approved', images:['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'], beds:5, baths:4, sqft:4500, sellerId:2, agentId:1, isFeatured:true, views:342, createdAt:new Date('2026-03-01'), updatedAt:new Date('2026-03-15') },
    { id:2, title:'Modern Apartment in Bahria Town', description:'Spacious 3-bed apartment with scenic views', price:18000000, city:'Lahore', area:'Bahria Town', type:'apartment', purpose:'sale', status:'approved', images:['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'], beds:3, baths:2, sqft:1800, sellerId:3, isFeatured:false, views:187, createdAt:new Date('2026-03-05'), updatedAt:new Date('2026-03-10') },
    { id:3, title:'10 Marla Plot in Johar Town', description:'Prime location residential plot', price:12000000, city:'Lahore', area:'Johar Town', type:'plot', purpose:'sale', status:'pending', images:['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80'], beds:0, baths:0, sqft:2700, sellerId:2, isFeatured:false, views:95, createdAt:new Date('2026-03-20'), updatedAt:new Date('2026-03-20') },
    { id:4, title:'Penthouse in F-7 Islamabad', description:'Top floor penthouse with 360 city view', price:85000000, city:'Islamabad', area:'F-7', type:'apartment', purpose:'sale', status:'approved', images:['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'], beds:4, baths:3, sqft:3200, sellerId:4, agentId:2, isFeatured:true, views:528, createdAt:new Date('2026-02-15'), updatedAt:new Date('2026-03-01') },
    { id:5, title:'3 Bed Flat for Rent in Gulberg', description:'Fully furnished flat near Main Boulevard', price:120000, city:'Lahore', area:'Gulberg', type:'apartment', purpose:'rent', status:'approved', images:['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'], beds:3, baths:2, sqft:1500, sellerId:3, isFeatured:false, views:210, createdAt:new Date('2026-03-10'), updatedAt:new Date('2026-03-12') },
    { id:6, title:'Commercial Plaza in Blue Area', description:'4-story commercial building prime location', price:250000000, city:'Islamabad', area:'Blue Area', type:'commercial', purpose:'sale', status:'pending', images:['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'], beds:0, baths:8, sqft:12000, sellerId:4, isFeatured:false, views:67, createdAt:new Date('2026-03-25'), updatedAt:new Date('2026-03-25') },
    { id:7, title:'Farm House in Bedian Road', description:'Beautiful farmhouse with lush gardens', price:35000000, city:'Lahore', area:'Bedian Road', type:'house', purpose:'sale', status:'approved', images:['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80'], beds:6, baths:5, sqft:8000, sellerId:2, agentId:1, isFeatured:true, views:415, createdAt:new Date('2026-02-20'), updatedAt:new Date('2026-03-05') },
    { id:8, title:'Studio Apartment Clifton', description:'Cozy studio near ocean', price:75000, city:'Karachi', area:'Clifton', type:'apartment', purpose:'rent', status:'approved', images:['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80'], beds:1, baths:1, sqft:550, sellerId:5, isFeatured:false, views:156, createdAt:new Date('2026-03-12'), updatedAt:new Date('2026-03-12') },
    { id:9, title:'5 Marla House in Model Town', description:'Newly built double story house', price:22000000, city:'Lahore', area:'Model Town', type:'house', purpose:'sale', status:'rejected', images:['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80'], beds:4, baths:3, sqft:2250, sellerId:5, isFeatured:false, views:44, createdAt:new Date('2026-03-18'), updatedAt:new Date('2026-03-22') },
    { id:10, title:'1 Kanal Plot in Bahria Phase 8', description:'Corner plot with all utilities paid', price:28000000, city:'Rawalpindi', area:'Bahria Phase 8', type:'plot', purpose:'sale', status:'pending', images:['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80'], beds:0, baths:0, sqft:5400, sellerId:3, isFeatured:false, views:73, createdAt:new Date('2026-03-28'), updatedAt:new Date('2026-03-28') },
    { id:11, title:'Beach View Villa Defence', description:'Luxury villa with private beach access', price:150000000, city:'Karachi', area:'DHA Defence', type:'house', purpose:'sale', status:'approved', images:['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80'], beds:7, baths:6, sqft:9500, sellerId:4, agentId:3, isFeatured:true, views:892, createdAt:new Date('2026-01-15'), updatedAt:new Date('2026-02-28') },
    { id:12, title:'Office Space in Gulshan', description:'Modern office space on main road', price:200000, city:'Karachi', area:'Gulshan-e-Iqbal', type:'commercial', purpose:'rent', status:'approved', images:['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'], beds:0, baths:2, sqft:2400, sellerId:5, isFeatured:false, views:134, createdAt:new Date('2026-03-08'), updatedAt:new Date('2026-03-08') },
  ];

  // ── Users ───────────────────────────────────────────────
  private users: DashboardUser[] = [
    { id:1, name:'Admin User', email:'admin@homefilla.com', phone:'+92 300 1234567', avatar:'https://randomuser.me/api/portraits/men/1.jpg', role:'admin', status:'active', createdAt:new Date('2026-01-01') },
    { id:2, name:'Ali Hassan', email:'ali.seller@gmail.com', phone:'+92 321 9876543', avatar:'https://randomuser.me/api/portraits/men/32.jpg', role:'seller', status:'active', createdAt:new Date('2026-02-10') },
    { id:3, name:'Sara Ahmed', email:'sara.seller@gmail.com', phone:'+92 333 5551234', avatar:'https://randomuser.me/api/portraits/women/44.jpg', role:'seller', status:'active', createdAt:new Date('2026-02-15') },
    { id:4, name:'Usman Khan', email:'usman.seller@gmail.com', phone:'+92 345 6667788', avatar:'https://randomuser.me/api/portraits/men/46.jpg', role:'seller', status:'active', createdAt:new Date('2026-02-20') },
    { id:5, name:'Fatima Noor', email:'fatima.seller@gmail.com', phone:'+92 312 2223344', avatar:'https://randomuser.me/api/portraits/women/68.jpg', role:'seller', status:'blocked', createdAt:new Date('2026-03-01') },
    { id:6, name:'Ahmed Raza', email:'ahmed.buyer@gmail.com', phone:'+92 300 1112233', avatar:'https://randomuser.me/api/portraits/men/75.jpg', role:'buyer', status:'active', createdAt:new Date('2026-03-05') },
    { id:7, name:'Zara Malik', email:'zara.buyer@gmail.com', phone:'+92 321 4445566', avatar:'https://randomuser.me/api/portraits/women/65.jpg', role:'buyer', status:'active', createdAt:new Date('2026-03-08') },
    { id:8, name:'Bilal Shah', email:'bilal.buyer@gmail.com', phone:'+92 333 7778899', avatar:'https://randomuser.me/api/portraits/men/22.jpg', role:'buyer', status:'active', createdAt:new Date('2026-03-10') },
    { id:9, name:'Hina Iqbal', email:'hina.buyer@gmail.com', phone:'+92 345 9990011', avatar:'https://randomuser.me/api/portraits/women/33.jpg', role:'buyer', status:'active', createdAt:new Date('2026-03-15') },
    { id:10, name:'Kashif Ali', email:'kashif.agent@gmail.com', phone:'+92 300 3334455', avatar:'https://randomuser.me/api/portraits/men/55.jpg', role:'agent', status:'active', createdAt:new Date('2026-02-12') },
  ];

  // ── Agents ──────────────────────────────────────────────
  private agents: DashboardAgent[] = [
    { id:1, userId:10, name:'Kashif Ali', email:'kashif.agent@gmail.com', phone:'+92 300 3334455', avatar:'https://randomuser.me/api/portraits/men/55.jpg', agencyName:'Prime Realty', listingsCount:24, totalSales:18, rating:4.8, status:'approved', createdAt:new Date('2026-02-12') },
    { id:2, name:'Asad Mehmood', userId:0, email:'asad.agent@gmail.com', phone:'+92 321 7776655', avatar:'https://randomuser.me/api/portraits/men/60.jpg', agencyName:'Elite Properties', listingsCount:31, totalSales:26, rating:4.9, status:'approved', createdAt:new Date('2026-01-20') },
    { id:3, name:'Nadia Hussain', userId:0, email:'nadia.agent@gmail.com', phone:'+92 333 1112244', avatar:'https://randomuser.me/api/portraits/women/55.jpg', agencyName:'Nadia Real Estate', listingsCount:15, totalSales:12, rating:4.6, status:'approved', createdAt:new Date('2026-02-25') },
    { id:4, name:'Faisal Raza', userId:0, email:'faisal.new@gmail.com', phone:'+92 345 8889900', avatar:'https://randomuser.me/api/portraits/men/40.jpg', agencyName:'Raza & Co.', listingsCount:0, totalSales:0, rating:0, status:'pending', createdAt:new Date('2026-03-28') },
  ];

  // ── Cities & Areas ──────────────────────────────────────
  private cities: City[] = [
    { id:1, name:'Lahore', province:'Punjab', propertyCount:6 },
    { id:2, name:'Islamabad', province:'Federal', propertyCount:2 },
    { id:3, name:'Karachi', province:'Sindh', propertyCount:3 },
    { id:4, name:'Rawalpindi', province:'Punjab', propertyCount:1 },
    { id:5, name:'Faisalabad', province:'Punjab', propertyCount:0 },
  ];

  private areas: Area[] = [
    { id:1, cityId:1, name:'DHA Phase 6', propertyCount:1 },
    { id:2, cityId:1, name:'Bahria Town', propertyCount:1 },
    { id:3, cityId:1, name:'Johar Town', propertyCount:1 },
    { id:4, cityId:1, name:'Gulberg', propertyCount:1 },
    { id:5, cityId:1, name:'Model Town', propertyCount:1 },
    { id:6, cityId:1, name:'Bedian Road', propertyCount:1 },
    { id:7, cityId:2, name:'F-7', propertyCount:1 },
    { id:8, cityId:2, name:'Blue Area', propertyCount:1 },
    { id:9, cityId:3, name:'Clifton', propertyCount:1 },
    { id:10, cityId:3, name:'DHA Defence', propertyCount:1 },
    { id:11, cityId:3, name:'Gulshan-e-Iqbal', propertyCount:1 },
    { id:12, cityId:4, name:'Bahria Phase 8', propertyCount:1 },
  ];

  // ── Inquiries ───────────────────────────────────────────
  private inquiries: Inquiry[] = [
    { id:1, propertyId:1, propertyTitle:'Luxury Villa in DHA Phase 6', userId:6, userName:'Ahmed Raza', userEmail:'ahmed.buyer@gmail.com', userPhone:'+92 300 1112233', message:'I am interested in this villa. Can I schedule a visit this weekend?', status:'new', createdAt:new Date('2026-03-28') },
    { id:2, propertyId:4, propertyTitle:'Penthouse in F-7 Islamabad', userId:7, userName:'Zara Malik', userEmail:'zara.buyer@gmail.com', userPhone:'+92 321 4445566', message:'Is the price negotiable? I would like to discuss further.', status:'assigned', assignedAgentId:2, createdAt:new Date('2026-03-25') },
    { id:3, propertyId:5, propertyTitle:'3 Bed Flat for Rent in Gulberg', userId:8, userName:'Bilal Shah', userEmail:'bilal.buyer@gmail.com', userPhone:'+92 333 7778899', message:'Is this flat still available? I need it from next month.', status:'new', createdAt:new Date('2026-03-30') },
    { id:4, propertyId:7, propertyTitle:'Farm House in Bedian Road', userId:9, userName:'Hina Iqbal', userEmail:'hina.buyer@gmail.com', userPhone:'+92 345 9990011', message:'Wonderful property! When can I visit?', status:'resolved', assignedAgentId:1, createdAt:new Date('2026-03-15') },
    { id:5, propertyId:11, propertyTitle:'Beach View Villa Defence', userId:6, userName:'Ahmed Raza', userEmail:'ahmed.buyer@gmail.com', userPhone:'+92 300 1112233', message:'This is my dream home. Please share more details and floor plan.', status:'new', createdAt:new Date('2026-04-01') },
  ];

  // ── Notifications ────────────────────────────────────────
  private notifications: AppNotification[] = [
    { id:1, type:'property_added', title:'New Property Listed', message:'Ali Hassan added "10 Marla Plot in Johar Town"', icon:'fa-home', color:'#4a6cf7', isRead:false, createdAt:new Date('2026-03-30T14:30:00') },
    { id:2, type:'user_registered', title:'New User Registered', message:'Hina Iqbal joined as a Buyer', icon:'fa-user-plus', color:'#22c55e', isRead:false, createdAt:new Date('2026-03-29T10:15:00') },
    { id:3, type:'new_inquiry', title:'New Inquiry Received', message:'Ahmed Raza inquired about "Beach View Villa Defence"', icon:'fa-envelope', color:'#f59e0b', isRead:false, createdAt:new Date('2026-04-01T09:00:00') },
    { id:4, type:'property_approved', title:'Property Approved', message:'"Penthouse in F-7" has been approved', icon:'fa-check-circle', color:'#22c55e', isRead:true, createdAt:new Date('2026-03-20T16:45:00') },
    { id:5, type:'agent_approved', title:'Agent Approved', message:'Nadia Hussain approved as an Agent', icon:'fa-user-tie', color:'#8b5cf6', isRead:true, createdAt:new Date('2026-03-15T11:20:00') },
    { id:6, type:'property_rejected', title:'Property Rejected', message:'"5 Marla House in Model Town" was rejected', icon:'fa-times-circle', color:'#ef4444', isRead:true, createdAt:new Date('2026-03-22T13:00:00') },
  ];

  // ══ GETTERS ══════════════════════════════════════════════

  getProperties(): DashboardProperty[] { return [...this.properties]; }
  getPropertyById(id: number): DashboardProperty | undefined { return this.properties.find(p => p.id === id); }
  getPropertiesByStatus(status: string): DashboardProperty[] { return this.properties.filter(p => p.status === status); }
  getPropertiesBySeller(sellerId: number): DashboardProperty[] { return this.properties.filter(p => p.sellerId === sellerId); }
  getFeaturedProperties(): DashboardProperty[] { return this.properties.filter(p => p.isFeatured); }

  getUsers(): DashboardUser[] { return [...this.users]; }
  getUserById(id: number): DashboardUser | undefined { return this.users.find(u => u.id === id); }
  getUsersByRole(role: string): DashboardUser[] { return this.users.filter(u => u.role === role); }

  getAgents(): DashboardAgent[] { return [...this.agents]; }
  getAgentById(id: number): DashboardAgent | undefined { return this.agents.find(a => a.id === id); }

  getCities(): City[] { return [...this.cities]; }
  getAreas(cityId?: number): Area[] { return cityId ? this.areas.filter(a => a.cityId === cityId) : [...this.areas]; }

  getInquiries(): Inquiry[] { return [...this.inquiries]; }
  getInquiriesByProperty(propertyId: number): Inquiry[] { return this.inquiries.filter(i => i.propertyId === propertyId); }

  getNotifications(): AppNotification[] { return [...this.notifications].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()); }
  getUnreadNotifications(): AppNotification[] { return this.notifications.filter(n => !n.isRead); }

  // ══ MUTATIONS ════════════════════════════════════════════

  updatePropertyStatus(id: number, status: 'pending' | 'approved' | 'rejected'): void {
    const p = this.properties.find(x => x.id === id);
    if (p) { p.status = status; p.updatedAt = new Date(); }
  }

  toggleFeatured(id: number): void {
    const p = this.properties.find(x => x.id === id);
    if (p) p.isFeatured = !p.isFeatured;
  }

  deleteProperty(id: number): void {
    this.properties = this.properties.filter(p => p.id !== id);
  }

  updateUserStatus(id: number, status: 'active' | 'blocked'): void {
    const u = this.users.find(x => x.id === id);
    if (u) u.status = status;
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
  }

  updateAgentStatus(id: number, status: 'pending' | 'approved' | 'rejected'): void {
    const a = this.agents.find(x => x.id === id);
    if (a) a.status = status;
  }

  updateInquiryStatus(id: number, status: 'new' | 'assigned' | 'resolved', agentId?: number): void {
    const inq = this.inquiries.find(x => x.id === id);
    if (inq) {
      inq.status = status;
      if (agentId) inq.assignedAgentId = agentId;
    }
  }

  markNotificationRead(id: number): void {
    const n = this.notifications.find(x => x.id === id);
    if (n) n.isRead = true;
  }

  markAllNotificationsRead(): void {
    this.notifications.forEach(n => n.isRead = true);
  }

  addCity(name: string, province: string): void {
    const id = Math.max(...this.cities.map(c => c.id)) + 1;
    this.cities.push({ id, name, province, propertyCount: 0 });
  }

  addArea(cityId: number, name: string): void {
    const id = Math.max(...this.areas.map(a => a.id)) + 1;
    this.areas.push({ id, cityId, name, propertyCount: 0 });
  }

  deleteCity(id: number): void {
    this.cities = this.cities.filter(c => c.id !== id);
    this.areas = this.areas.filter(a => a.cityId !== id);
  }

  deleteArea(id: number): void {
    this.areas = this.areas.filter(a => a.id !== id);
  }

  // ══ DASHBOARD STATS ══════════════════════════════════════

  getAdminStats() {
    return {
      totalProperties: this.properties.length,
      activeListings: this.properties.filter(p => p.status === 'approved').length,
      pendingApproval: this.properties.filter(p => p.status === 'pending').length,
      totalUsers: this.users.filter(u => u.role === 'buyer' || u.role === 'seller').length,
      totalAgents: this.agents.length,
      totalInquiries: this.inquiries.length,
    };
  }

  getSellerStats(sellerId: number) {
    const myProps = this.properties.filter(p => p.sellerId === sellerId);
    return {
      totalListings: myProps.length,
      activeListings: myProps.filter(p => p.status === 'approved').length,
      pendingListings: myProps.filter(p => p.status === 'pending').length,
      totalViews: myProps.reduce((sum, p) => sum + p.views, 0),
      inquiriesReceived: this.inquiries.filter(i => myProps.some(p => p.id === i.propertyId)).length,
    };
  }

  getBuyerStats(buyerId: number) {
    return {
      savedProperties: 5,
      inquiriesSent: this.inquiries.filter(i => i.userId === buyerId).length,
      propertiesViewed: 28,
      recommended: 12,
    };
  }

  getPropertiesByCity(): { city: string; count: number }[] {
    const map = new Map<string, number>();
    this.properties.forEach(p => map.set(p.city, (map.get(p.city) || 0) + 1));
    return Array.from(map, ([city, count]) => ({ city, count })).sort((a, b) => b.count - a.count);
  }

  getMonthlyGrowth(): { month: string; count: number }[] {
    return [
      { month: 'Oct', count: 8 }, { month: 'Nov', count: 12 },
      { month: 'Dec', count: 15 }, { month: 'Jan', count: 22 },
      { month: 'Feb', count: 18 }, { month: 'Mar', count: 28 },
    ];
  }

  getRecentActivity(): { avatar: string; text: string; time: string; type: string }[] {
    return [
      { avatar: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Ali Hassan added "10 Marla Plot in Johar Town"', time: '2 hours ago', type: 'property' },
      { avatar: 'https://randomuser.me/api/portraits/women/33.jpg', text: 'Hina Iqbal registered as Buyer', time: '5 hours ago', type: 'user' },
      { avatar: 'https://randomuser.me/api/portraits/men/1.jpg', text: 'Admin approved "Penthouse in F-7"', time: '1 day ago', type: 'approval' },
      { avatar: 'https://randomuser.me/api/portraits/men/55.jpg', text: 'Kashif Ali assigned to inquiry #2', time: '1 day ago', type: 'inquiry' },
      { avatar: 'https://randomuser.me/api/portraits/women/55.jpg', text: 'Nadia Hussain approved as Agent', time: '2 days ago', type: 'agent' },
      { avatar: 'https://randomuser.me/api/portraits/men/1.jpg', text: 'Admin rejected "5 Marla House in Model Town"', time: '3 days ago', type: 'rejection' },
    ];
  }
}
