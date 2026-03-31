export interface Property {
  id: number;
  image: string;
  price: string;
  address: string;
  city: string;
  beds: number;
  baths: number;
  sqft: string;
  badge?: string;
  badgeClass?: string;
  agentName: string;
  agentAvatar: string;
  agentTitle: string;
}

export interface CategoryInfo {
  slug: string;
  label: string;
  count: number;
  image: string;
  description: string;
  properties: Property[];
}

const AGENTS = [
  { name: 'John Doe',    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',    title: 'Premier Agent' },
  { name: 'Jane Smith',  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',   title: 'Top Agent' },
  { name: 'Mike Ross',   avatar: 'https://randomuser.me/api/portraits/men/46.jpg',     title: 'Premier Agent' },
  { name: 'Lisa Garcia', avatar: 'https://randomuser.me/api/portraits/women/68.jpg',  title: 'Luxury Specialist' },
  { name: 'Sarah Lee',   avatar: 'https://randomuser.me/api/portraits/women/65.jpg',  title: 'Local Expert' },
  { name: 'David Kim',   avatar: 'https://randomuser.me/api/portraits/men/75.jpg',     title: 'Premier Agent' },
];

function agent(i: number) { 
  const a = AGENTS[i % AGENTS.length]; 
  return { agentName: a.name, agentAvatar: a.avatar, agentTitle: a.title };
}

const LISTINGS_DATA: Record<string, CategoryInfo> = {
  'new-listings': {
    slug: 'new-listings', label: 'New listings', count: 360,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85',
    description: 'Freshly listed homes — be the first to make an offer.',
    properties: [
      { id:1, image:'https://picsum.photos/id/1011/600/400', price:'$549,000', address:'123 Main Street', city:'Austin, TX 78701', beds:3, baths:2, sqft:'1,850', badge:'Just listed', badgeClass:'badge-blue', ...agent(0) },
      { id:2, image:'https://picsum.photos/id/1015/600/400', price:'$725,000', address:'456 Oak Avenue', city:'Seattle, WA 98101', beds:4, baths:3, sqft:'2,400', badge:'Just listed', badgeClass:'badge-blue', ...agent(1) },
      { id:3, image:'https://picsum.photos/id/1016/600/400', price:'$389,000', address:'789 Pine Street', city:'Denver, CO 80201', beds:2, baths:1, sqft:'1,200', ...agent(2) },
      { id:4, image:'https://picsum.photos/id/1018/600/400', price:'$899,000', address:'1010 Maple Drive', city:'Miami, FL 33101', beds:5, baths:4, sqft:'3,200', badge:'Just listed', badgeClass:'badge-blue', ...agent(3) },
      { id:5, image:'https://picsum.photos/id/1019/600/400', price:'$415,000', address:'202 Elm Street', city:'Chicago, IL 60601', beds:3, baths:2, sqft:'1,500', ...agent(4) },
      { id:6, image:'https://picsum.photos/id/1020/600/400', price:'$1,250,000', address:'500 Sunset Blvd', city:'Los Angeles, CA 90028', beds:4, baths:4, sqft:'3,500', badge:'Just listed', badgeClass:'badge-blue', ...agent(5) },
      { id:7, image:'https://picsum.photos/id/1021/600/400', price:'$299,000', address:'888 River Road', city:'Nashville, TN 37201', beds:2, baths:1, sqft:'1,050', ...agent(0) },
      { id:8, image:'https://picsum.photos/id/1022/600/400', price:'$650,000', address:'333 Pearl Street', city:'Portland, OR 97209', beds:3, baths:3, sqft:'2,100', ...agent(1) },
      { id:9, image:'https://picsum.photos/id/1023/600/400', price:'$875,000', address:'444 Ocean Ave', city:'San Diego, CA 92101', beds:4, baths:3, sqft:'2,800', badge:'Just listed', badgeClass:'badge-blue', ...agent(2) },
      { id:10, image:'https://picsum.photos/id/1024/600/400', price:'$310,000', address:'555 Lakeview Dr', city:'Orlando, FL 32801', beds:2, baths:2, sqft:'1,150', ...agent(3) },
      { id:11, image:'https://picsum.photos/id/1025/600/400', price:'$495,000', address:'666 Forest Ln', city:'Atlanta, GA 30301', beds:3, baths:2, sqft:'1,900', ...agent(4) },
      { id:12, image:'https://picsum.photos/id/1026/600/400', price:'$1,450,000', address:'777 Mountain View', city:'Aspen, CO 81611', beds:5, baths:5, sqft:'4,200', badge:'Just listed', badgeClass:'badge-blue', ...agent(5) },
      { id:13, image:'https://picsum.photos/id/1027/600/400', price:'$562,000', address:'91 Harbor Walk', city:'Charleston, SC 29401', beds:3, baths:2, sqft:'1,720', ...agent(0) },
      { id:14, image:'https://picsum.photos/id/1028/600/400', price:'$420,000', address:'14 Birchwood Ct', city:'Raleigh, NC 27601', beds:3, baths:2, sqft:'1,640', ...agent(1) },
      { id:15, image:'https://picsum.photos/id/1029/600/400', price:'$835,000', address:'78 Bayshore Dr', city:'Tampa, FL 33602', beds:4, baths:3, sqft:'2,650', badge:'Just listed', badgeClass:'badge-blue', ...agent(2) },
      { id:16, image:'https://picsum.photos/id/1030/600/400', price:'$275,000', address:'203 Cedar Blvd', city:'Indianapolis, IN 46201', beds:2, baths:1, sqft:'980', ...agent(3) },
      { id:17, image:'https://picsum.photos/id/1031/600/400', price:'$710,000', address:'415 Sunset Ridge', city:'Scottsdale, AZ 85251', beds:4, baths:3, sqft:'2,300', ...agent(4) },
      { id:18, image:'https://picsum.photos/id/1032/600/400', price:'$990,000', address:'88 Blue Harbor Rd', city:'Sarasota, FL 34230', beds:4, baths:4, sqft:'3,100', badge:'Just listed', badgeClass:'badge-blue', ...agent(5) },
      { id:19, image:'https://picsum.photos/id/1033/600/400', price:'$355,000', address:'1720 Creekside Way', city:'Columbus, OH 43201', beds:3, baths:2, sqft:'1,450', ...agent(0) },
      { id:20, image:'https://picsum.photos/id/1035/600/400', price:'$1,150,000', address:'300 Pacific Bluff', city:'Santa Barbara, CA 93101', beds:5, baths:4, sqft:'3,800', badge:'Just listed', badgeClass:'badge-blue', ...agent(1) },
      { id:21, image:'https://picsum.photos/id/1036/600/400', price:'$480,000', address:'62 Greenfield Rd', city:'Louisville, KY 40201', beds:3, baths:2, sqft:'1,780', ...agent(2) },
      { id:22, image:'https://picsum.photos/id/1037/600/400', price:'$640,000', address:'910 Hilltop Cir', city:'Richmond, VA 23230', beds:4, baths:3, sqft:'2,200', ...agent(3) },
      { id:23, image:'https://picsum.photos/id/1038/600/400', price:'$830,000', address:'55 Lakewood Ave', city:'Minneapolis, MN 55401', beds:4, baths:3, sqft:'2,750', badge:'Just listed', badgeClass:'badge-blue', ...agent(4) },
      { id:24, image:'https://picsum.photos/id/1039/600/400', price:'$395,000', address:'7 Thornberry Ln', city:'Kansas City, MO 64102', beds:3, baths:2, sqft:'1,500', ...agent(5) },
    ]
  },

  'price-reduced': {
    slug: 'price-reduced', label: 'Price reduced', count: 117,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=85',
    description: 'Motivated sellers — great deals waiting for you.',
    properties: [
      { id:1, image:'https://picsum.photos/id/20/600/400', price:'$489,000', address:'456 Oak Avenue', city:'Seattle, WA 98101', beds:4, baths:3, sqft:'2,400', badge:'Price drop', badgeClass:'badge-red', ...agent(0) },
      { id:2, image:'https://picsum.photos/id/28/600/400', price:'$348,000', address:'123 Willow St', city:'Phoenix, AZ 85001', beds:3, baths:2, sqft:'1,650', badge:'Price drop', badgeClass:'badge-red', ...agent(1) },
      { id:3, image:'https://picsum.photos/id/29/600/400', price:'$615,000', address:'9 Redwood Dr', city:'Sacramento, CA 95814', beds:4, baths:3, sqft:'2,150', badge:'Price drop', badgeClass:'badge-red', ...agent(2) },
      { id:4, image:'https://picsum.photos/id/30/600/400', price:'$259,000', address:'77 Briar Creek Rd', city:'Memphis, TN 38101', beds:2, baths:1, sqft:'1,020', badge:'Price drop', badgeClass:'badge-red', ...agent(3) },
      { id:5, image:'https://picsum.photos/id/32/600/400', price:'$730,000', address:'412 Laguna Blvd', city:'Newport Beach, CA 92660', beds:4, baths:3, sqft:'2,600', badge:'Price drop', badgeClass:'badge-red', ...agent(4) },
      { id:6, image:'https://picsum.photos/id/33/600/400', price:'$525,000', address:'5 Parkwood Terr', city:'Charlotte, NC 28201', beds:3, baths:2, sqft:'1,900', badge:'Price drop', badgeClass:'badge-red', ...agent(5) },
      { id:7, image:'https://picsum.photos/id/36/600/400', price:'$398,000', address:'22 Silverbell Ct', city:'Albuquerque, NM 87101', beds:3, baths:2, sqft:'1,550', badge:'Price drop', badgeClass:'badge-red', ...agent(0) },
      { id:8, image:'https://picsum.photos/id/37/600/400', price:'$899,000', address:'800 Oceanside Ave', city:'Honolulu, HI 96801', beds:4, baths:4, sqft:'2,950', badge:'Price drop', badgeClass:'badge-red', ...agent(1) },
      { id:9, image:'https://picsum.photos/id/38/600/400', price:'$310,000', address:'34 Birchwood Lane', city:'Pittsburgh, PA 15201', beds:3, baths:1, sqft:'1,350', badge:'Price drop', badgeClass:'badge-red', ...agent(2) },
      { id:10, image:'https://picsum.photos/id/39/600/400', price:'$595,000', address:'120 Marina View', city:'San Jose, CA 95101', beds:3, baths:3, sqft:'2,000', badge:'Price drop', badgeClass:'badge-red', ...agent(3) },
      { id:11, image:'https://picsum.photos/id/40/600/400', price:'$445,000', address:'67 Meadowbrook Ct', city:'Salt Lake City, UT 84101', beds:3, baths:2, sqft:'1,700', badge:'Price drop', badgeClass:'badge-red', ...agent(4) },
      { id:12, image:'https://picsum.photos/id/42/600/400', price:'$1,100,000', address:'1 Shoreline Cir', city:'San Francisco, CA 94101', beds:5, baths:4, sqft:'3,600', badge:'Price drop', badgeClass:'badge-red', ...agent(5) },
      { id:13, image:'https://picsum.photos/id/43/600/400', price:'$278,000', address:'45 Cottage Row', city:'Omaha, NE 68101', beds:2, baths:2, sqft:'1,100', badge:'Price drop', badgeClass:'badge-red', ...agent(0) },
      { id:14, image:'https://picsum.photos/id/44/600/400', price:'$695,000', address:'300 Canyon Edge Rd', city:'Tucson, AZ 85701', beds:4, baths:3, sqft:'2,400', badge:'Price drop', badgeClass:'badge-red', ...agent(1) },
      { id:15, image:'https://picsum.photos/id/45/600/400', price:'$515,000', address:'188 Tanglewood Dr', city:'Denver, CO 80201', beds:3, baths:2, sqft:'1,870', badge:'Price drop', badgeClass:'badge-red', ...agent(2) },
      { id:16, image:'https://picsum.photos/id/46/600/400', price:'$355,000', address:'902 Chestnut Way', city:'Oklahoma City, OK 73101', beds:3, baths:2, sqft:'1,480', badge:'Price drop', badgeClass:'badge-red', ...agent(3) },
    ]
  },

  'open-houses': {
    slug: 'open-houses', label: 'Open houses', count: 163,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1800&q=85',
    description: 'Tour homes this weekend — no appointment needed.',
    properties: [
      { id:1, image:'https://picsum.photos/id/57/600/400', price:'$1,250,000', address:'500 Sunset Blvd', city:'Los Angeles, CA 90028', beds:4, baths:4, sqft:'3,500', badge:'Open House', badgeClass:'badge-blue', ...agent(0) },
      { id:2, image:'https://picsum.photos/id/58/600/400', price:'$620,000', address:'34 Harbor View Ln', city:'Boston, MA 02101', beds:3, baths:2, sqft:'1,950', badge:'Open House', badgeClass:'badge-blue', ...agent(1) },
      { id:3, image:'https://picsum.photos/id/59/600/400', price:'$440,000', address:'11 Rosewood Ave', city:'Nashville, TN 37201', beds:3, baths:2, sqft:'1,680', badge:'Open House', badgeClass:'badge-blue', ...agent(2) },
      { id:4, image:'https://picsum.photos/id/60/600/400', price:'$875,000', address:'920 Eastwood Cir', city:'Austin, TX 78701', beds:4, baths:3, sqft:'2,750', badge:'Open House', badgeClass:'badge-blue', ...agent(3) },
      { id:5, image:'https://picsum.photos/id/62/600/400', price:'$335,000', address:'45 Mapleton Dr', city:'Cleveland, OH 44101', beds:2, baths:2, sqft:'1,250', badge:'Open House', badgeClass:'badge-blue', ...agent(4) },
      { id:6, image:'https://picsum.photos/id/63/600/400', price:'$750,000', address:'777 Bayside Dr', city:'San Diego, CA 92101', beds:4, baths:3, sqft:'2,600', badge:'Open House', badgeClass:'badge-blue', ...agent(5) },
      { id:7, image:'https://picsum.photos/id/64/600/400', price:'$510,000', address:'200 Hillcrest Ave', city:'Portland, OR 97201', beds:3, baths:2, sqft:'1,820', badge:'Open House', badgeClass:'badge-blue', ...agent(0) },
      { id:8, image:'https://picsum.photos/id/65/600/400', price:'$1,050,000', address:'88 Palm Bay Rd', city:'Miami, FL 33101', beds:5, baths:4, sqft:'3,400', badge:'Open House', badgeClass:'badge-blue', ...agent(1) },
      { id:9, image:'https://picsum.photos/id/66/600/400', price:'$395,000', address:'560 Willowbrook Rd', city:'Denver, CO 80209', beds:3, baths:2, sqft:'1,550', badge:'Open House', badgeClass:'badge-blue', ...agent(2) },
      { id:10, image:'https://picsum.photos/id/67/600/400', price:'$585,000', address:'14 Camelot Dr', city:'Scottsdale, AZ 85251', beds:3, baths:3, sqft:'2,100', badge:'Open House', badgeClass:'badge-blue', ...agent(3) },
      { id:11, image:'https://picsum.photos/id/68/600/400', price:'$320,000', address:'90 Maple Grove', city:'St Louis, MO 63101', beds:2, baths:1, sqft:'1,100', badge:'Open House', badgeClass:'badge-blue', ...agent(4) },
      { id:12, image:'https://picsum.photos/id/69/600/400', price:'$940,000', address:'1 Cliff Edge Pl', city:'San Francisco, CA 94101', beds:4, baths:3, sqft:'2,900', badge:'Open House', badgeClass:'badge-blue', ...agent(5) },
      { id:13, image:'https://picsum.photos/id/70/600/400', price:'$455,000', address:'320 Lakewood Ct', city:'Minneapolis, MN 55401', beds:3, baths:2, sqft:'1,720', badge:'Open House', badgeClass:'badge-blue', ...agent(0) },
      { id:14, image:'https://picsum.photos/id/71/600/400', price:'$670,000', address:'7 Peach Orchard Rd', city:'Atlanta, GA 30308', beds:4, baths:3, sqft:'2,350', badge:'Open House', badgeClass:'badge-blue', ...agent(1) },
      { id:15, image:'https://picsum.photos/id/72/600/400', price:'$890,000', address:'222 Vineyard Ln', city:'Napa, CA 94558', beds:4, baths:4, sqft:'3,050', badge:'Open House', badgeClass:'badge-blue', ...agent(2) },
      { id:16, image:'https://picsum.photos/id/73/600/400', price:'$415,000', address:'800 Highland Ave', city:'Richmond, VA 23220', beds:3, baths:2, sqft:'1,600', badge:'Open House', badgeClass:'badge-blue', ...agent(3) },
    ]
  },

  'recently-sold': {
    slug: 'recently-sold', label: 'Recently sold', count: 3048,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1800&q=85',
    description: 'See what homes sold for in your neighborhood.',
    properties: [
      { id:1, image:'https://picsum.photos/id/75/600/400', price:'$742,000', address:'44 Westbrook Lp', city:'Seattle, WA 98105', beds:4, baths:3, sqft:'2,500', badge:'Sold', badgeClass:'badge-green', ...agent(0) },
      { id:2, image:'https://picsum.photos/id/76/600/400', price:'$528,000', address:'19 Waverly Pl', city:'Austin, TX 78702', beds:3, baths:2, sqft:'1,750', badge:'Sold', badgeClass:'badge-green', ...agent(1) },
      { id:3, image:'https://picsum.photos/id/77/600/400', price:'$1,340,000', address:'6 Coastal Bluff Dr', city:'Malibu, CA 90265', beds:5, baths:5, sqft:'4,100', badge:'Sold', badgeClass:'badge-green', ...agent(2) },
      { id:4, image:'https://picsum.photos/id/78/600/400', price:'$398,000', address:'77 Palm Terrace', city:'Tampa, FL 33601', beds:3, baths:2, sqft:'1,480', badge:'Sold', badgeClass:'badge-green', ...agent(3) },
      { id:5, image:'https://picsum.photos/id/79/600/400', price:'$285,000', address:'303 Oleander St', city:'San Antonio, TX 78201', beds:2, baths:2, sqft:'1,120', badge:'Sold', badgeClass:'badge-green', ...agent(4) },
      { id:6, image:'https://picsum.photos/id/80/600/400', price:'$815,000', address:'9 Bluebell Ct', city:'Chicago, IL 60610', beds:4, baths:3, sqft:'2,700', badge:'Sold', badgeClass:'badge-green', ...agent(5) },
      { id:7, image:'https://picsum.photos/id/81/600/400', price:'$450,000', address:'122 Sage Run', city:'Phoenix, AZ 85016', beds:3, baths:2, sqft:'1,650', badge:'Sold', badgeClass:'badge-green', ...agent(0) },
      { id:8, image:'https://picsum.photos/id/82/600/400', price:'$1,025,000', address:'55 La Jolla Cove', city:'La Jolla, CA 92037', beds:4, baths:4, sqft:'3,200', badge:'Sold', badgeClass:'badge-green', ...agent(1) },
      { id:9, image:'https://picsum.photos/id/83/600/400', price:'$340,000', address:'19 Spruce Mill Rd', city:'Charlotte, NC 28205', beds:3, baths:2, sqft:'1,400', badge:'Sold', badgeClass:'badge-green', ...agent(2) },
      { id:10, image:'https://picsum.photos/id/84/600/400', price:'$675,000', address:'57 Harbor Blvd', city:'Long Beach, CA 90802', beds:4, baths:3, sqft:'2,300', badge:'Sold', badgeClass:'badge-green', ...agent(3) },
      { id:11, image:'https://picsum.photos/id/85/600/400', price:'$490,000', address:'18 Dove Creek Rd', city:'Denver, CO 80204', beds:3, baths:2, sqft:'1,800', badge:'Sold', badgeClass:'badge-green', ...agent(4) },
      { id:12, image:'https://picsum.photos/id/86/600/400', price:'$1,900,000', address:'1 Summit Ridge Ct', city:'Beverly Hills, CA 90210', beds:6, baths:6, sqft:'6,200', badge:'Sold', badgeClass:'badge-green', ...agent(5) },
      { id:13, image:'https://picsum.photos/id/87/600/400', price:'$315,000', address:'400 Legacy Dr', city:'Columbus, OH 43215', beds:2, baths:2, sqft:'1,200', badge:'Sold', badgeClass:'badge-green', ...agent(0) },
      { id:14, image:'https://picsum.photos/id/88/600/400', price:'$555,000', address:'88 Horizon Blvd', city:'Las Vegas, NV 89101', beds:3, baths:2, sqft:'1,920', badge:'Sold', badgeClass:'badge-green', ...agent(1) },
      { id:15, image:'https://picsum.photos/id/89/600/400', price:'$730,000', address:'21 Ridgeway Ln', city:'Portland, OR 97214', beds:4, baths:3, sqft:'2,500', badge:'Sold', badgeClass:'badge-green', ...agent(2) },
      { id:16, image:'https://picsum.photos/id/90/600/400', price:'$215,000', address:'607 Plum Creek Rd', city:'Memphis, TN 38109', beds:2, baths:1, sqft:'900', badge:'Sold', badgeClass:'badge-green', ...agent(3) },
      { id:17, image:'https://picsum.photos/id/91/600/400', price:'$870,000', address:'5 Palomar Way', city:'San Diego, CA 92120', beds:4, baths:3, sqft:'2,850', badge:'Sold', badgeClass:'badge-green', ...agent(4) },
      { id:18, image:'https://picsum.photos/id/92/600/400', price:'$610,000', address:'700 Northshore Dr', city:'Chicago, IL 60626', beds:3, baths:3, sqft:'2,100', badge:'Sold', badgeClass:'badge-green', ...agent(5) },
      { id:19, image:'https://picsum.photos/id/93/600/400', price:'$425,000', address:'162 Bradford Ave', city:'Raleigh, NC 27615', beds:3, baths:2, sqft:'1,620', badge:'Sold', badgeClass:'badge-green', ...agent(0) },
      { id:20, image:'https://picsum.photos/id/94/600/400', price:'$995,000', address:'33 Pinnacle Rd', city:'Scottsdale, AZ 85255', beds:5, baths:4, sqft:'3,700', badge:'Sold', badgeClass:'badge-green', ...agent(1) },
      { id:21, image:'https://picsum.photos/id/95/600/400', price:'$385,000', address:'14 Foxglove Dr', city:'Louisville, KY 40205', beds:3, baths:2, sqft:'1,530', badge:'Sold', badgeClass:'badge-green', ...agent(2) },
      { id:22, image:'https://picsum.photos/id/96/600/400', price:'$780,000', address:'2 Misty Morning Ct', city:'Atlanta, GA 30327', beds:4, baths:3, sqft:'2,650', badge:'Sold', badgeClass:'badge-green', ...agent(3) },
      { id:23, image:'https://picsum.photos/id/97/600/400', price:'$1,200,000', address:'90 Bayview Heights', city:'San Francisco, CA 94124', beds:5, baths:4, sqft:'3,900', badge:'Sold', badgeClass:'badge-green', ...agent(4) },
      { id:24, image:'https://picsum.photos/id/98/600/400', price:'$340,000', address:'501 Rustic Ranch Rd', city:'San Antonio, TX 78260', beds:3, baths:2, sqft:'1,410', badge:'Sold', badgeClass:'badge-green', ...agent(5) },
    ]
  },

  'new-construction': {
    slug: 'new-construction', label: 'New construction', count: 107,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85',
    description: 'Brand new builds — never lived in, full warranty.',
    properties: [
      { id:1, image:'https://picsum.photos/id/103/600/400', price:'$625,000', address:'12 Ember Trail', city:'Austin, TX 78738', beds:4, baths:3, sqft:'2,350', badge:'New', badgeClass:'badge-green', ...agent(0) },
      { id:2, image:'https://picsum.photos/id/104/600/400', price:'$498,000', address:'5 Copper Bluff Ct', city:'Dallas, TX 75201', beds:3, baths:2, sqft:'1,900', badge:'New', badgeClass:'badge-green', ...agent(1) },
      { id:3, image:'https://picsum.photos/id/105/600/400', price:'$715,000', address:'30 Ironwood Way', city:'Phoenix, AZ 85001', beds:4, baths:3, sqft:'2,600', badge:'New', badgeClass:'badge-green', ...agent(2) },
      { id:4, image:'https://picsum.photos/id/106/600/400', price:'$850,000', address:'100 Skyline Loop', city:'Denver, CO 80237', beds:4, baths:4, sqft:'2,900', badge:'New', badgeClass:'badge-green', ...agent(3) },
      { id:5, image:'https://picsum.photos/id/107/600/400', price:'$540,000', address:'18 Topaz Blvd', city:'Las Vegas, NV 89118', beds:3, baths:3, sqft:'2,050', badge:'New', badgeClass:'badge-green', ...agent(4) },
      { id:6, image:'https://picsum.photos/id/108/600/400', price:'$970,000', address:'7 Summit Glen Dr', city:'Salt Lake City, UT 84121', beds:5, baths:4, sqft:'3,500', badge:'New', badgeClass:'badge-green', ...agent(5) },
      { id:7, image:'https://picsum.photos/id/109/600/400', price:'$430,000', address:'55 Primrose Path', city:'Raleigh, NC 27613', beds:3, baths:2, sqft:'1,750', badge:'New', badgeClass:'badge-green', ...agent(0) },
      { id:8, image:'https://picsum.photos/id/110/600/400', price:'$1,150,000', address:'22 Crystal Falls Ct', city:'Bellevue, WA 98004', beds:5, baths:5, sqft:'4,000', badge:'New', badgeClass:'badge-green', ...agent(1) },
      { id:9, image:'https://picsum.photos/id/111/600/400', price:'$390,000', address:'8 Maplecrest Loop', city:'Charlotte, NC 28277', beds:3, baths:2, sqft:'1,600', badge:'New', badgeClass:'badge-green', ...agent(2) },
      { id:10, image:'https://picsum.photos/id/112/600/400', price:'$695,000', address:'14 Granite Ridge Dr', city:'Alpharetta, GA 30004', beds:4, baths:3, sqft:'2,450', badge:'New', badgeClass:'badge-green', ...agent(3) },
      { id:11, image:'https://picsum.photos/id/113/600/400', price:'$545,000', address:'60 Willow Springs Ln', city:'Frisco, TX 75034', beds:3, baths:3, sqft:'2,100', badge:'New', badgeClass:'badge-green', ...agent(4) },
      { id:12, image:'https://picsum.photos/id/114/600/400', price:'$1,080,000', address:'3 Arbor Heights Ct', city:'Kirkland, WA 98033', beds:5, baths:4, sqft:'3,700', badge:'New', badgeClass:'badge-green', ...agent(5) },
    ]
  },

  'new-home-communities': {
    slug: 'new-home-communities', label: 'New home communities', count: 1,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&q=85',
    description: 'Exclusive master-planned communities — your perfect neighborhood.',
    properties: [
      { id:1, image:'https://picsum.photos/id/117/600/400', price:'$750,000 – $1.4M', address:'Harmony Heights Community', city:'Frisco, TX 75033', beds:4, baths:3, sqft:'2,800 – 4,500', badge:'Exclusive', badgeClass:'badge-blue', ...agent(3) },
    ]
  },

  'land': {
    slug: 'land', label: 'Land', count: 63,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85',
    description: 'Raw land and vacant lots — build your vision from the ground up.',
    properties: [
      { id:1, image:'https://picsum.photos/id/118/600/400', price:'$95,000', address:'Lot 4 Highland Ranch Rd', city:'Bozeman, MT 59715', beds:0, baths:0, sqft:'2.4 acres', badge:'Land', badgeClass:'badge-land', ...agent(0) },
      { id:2, image:'https://picsum.photos/id/119/600/400', price:'$140,000', address:'Parcel 7 – River Bend Ln', city:'Bend, OR 97701', beds:0, baths:0, sqft:'1.8 acres', badge:'Land', badgeClass:'badge-land', ...agent(1) },
      { id:3, image:'https://picsum.photos/id/120/600/400', price:'$65,000', address:'Lot 12 Meadow Crest Pl', city:'Durango, CO 81301', beds:0, baths:0, sqft:'0.75 acres', badge:'Land', badgeClass:'badge-land', ...agent(2) },
      { id:4, image:'https://picsum.photos/id/121/600/400', price:'$225,000', address:'20 Ridgeline Dr (Raw Land)', city:'Lake Tahoe, CA 96150', beds:0, baths:0, sqft:'3.1 acres', badge:'Land', badgeClass:'badge-land', ...agent(3) },
      { id:5, image:'https://picsum.photos/id/122/600/400', price:'$55,000', address:'Lot 3 Sunrise Flats', city:'Flagstaff, AZ 86001', beds:0, baths:0, sqft:'0.5 acres', badge:'Land', badgeClass:'badge-land', ...agent(4) },
      { id:6, image:'https://picsum.photos/id/123/600/400', price:'$180,000', address:'Parcel B Canyon Creek', city:'Sedona, AZ 86336', beds:0, baths:0, sqft:'2.0 acres', badge:'Land', badgeClass:'badge-land', ...agent(5) },
      { id:7, image:'https://picsum.photos/id/124/600/400', price:'$78,000', address:'Lot 9 Prairie View Rd', city:'Abilene, TX 79601', beds:0, baths:0, sqft:'5.0 acres', badge:'Land', badgeClass:'badge-land', ...agent(0) },
      { id:8, image:'https://picsum.photos/id/125/600/400', price:'$310,000', address:'10 Coastal Bluff Acres', city:'Half Moon Bay, CA 94019', beds:0, baths:0, sqft:'1.2 acres', badge:'Land', badgeClass:'badge-land', ...agent(1) },
      { id:9, image:'https://picsum.photos/id/126/600/400', price:'$42,000', address:'Lot 22 Pine Ridge Rd', city:'Coeur d\'Alene, ID 83814', beds:0, baths:0, sqft:'0.35 acres', badge:'Land', badgeClass:'badge-land', ...agent(2) },
      { id:10, image:'https://picsum.photos/id/127/600/400', price:'$130,000', address:'Parcel 4 Sunset Valley', city:'Taos, NM 87571', beds:0, baths:0, sqft:'1.5 acres', badge:'Land', badgeClass:'badge-land', ...agent(3) },
      { id:11, image:'https://picsum.photos/id/128/600/400', price:'$89,000', address:'Lot 7 Creekside Way', city:'Jackson, WY 83001', beds:0, baths:0, sqft:'0.8 acres', badge:'Land', badgeClass:'badge-land', ...agent(4) },
      { id:12, image:'https://picsum.photos/id/129/600/400', price:'$195,000', address:'5 Vineyard Parcel', city:'Temecula, CA 92590', beds:0, baths:0, sqft:'4.0 acres', badge:'Land', badgeClass:'badge-land', ...agent(5) },
    ]
  },

  'foreclosures': {
    slug: 'foreclosures', label: 'Foreclosures', count: 13,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1800&q=85',
    description: 'Bank-owned properties available at below-market prices.',
    properties: [
      { id:1, image:'https://picsum.photos/id/130/600/400', price:'$198,000', address:'14 Cypress Ave', city:'Detroit, MI 48201', beds:3, baths:1, sqft:'1,250', badge:'Foreclosure', badgeClass:'badge-red', ...agent(0) },
      { id:2, image:'https://picsum.photos/id/131/600/400', price:'$145,000', address:'508 Poplar St', city:'Cleveland, OH 44101', beds:2, baths:1, sqft:'980', badge:'Foreclosure', badgeClass:'badge-red', ...agent(1) },
      { id:3, image:'https://picsum.photos/id/132/600/400', price:'$312,000', address:'77 Wisteria Ln', city:'Memphis, TN 38104', beds:3, baths:2, sqft:'1,480', badge:'Foreclosure', badgeClass:'badge-red', ...agent(2) },
      { id:4, image:'https://picsum.photos/id/133/600/400', price:'$89,000', address:'22 Tulip Dr', city:'Baltimore, MD 21201', beds:2, baths:1, sqft:'870', badge:'Foreclosure', badgeClass:'badge-red', ...agent(3) },
      { id:5, image:'https://picsum.photos/id/134/600/400', price:'$265,000', address:'900 Pinewood Circle', city:'St Louis, MO 63101', beds:3, baths:2, sqft:'1,380', badge:'Foreclosure', badgeClass:'badge-red', ...agent(4) },
      { id:6, image:'https://picsum.photos/id/135/600/400', price:'$178,000', address:'34 Aspen Court', city:'Toledo, OH 43601', beds:3, baths:1, sqft:'1,120', badge:'Foreclosure', badgeClass:'badge-red', ...agent(5) },
      { id:7, image:'https://picsum.photos/id/136/600/400', price:'$420,000', address:'5 Juniper Ridge Dr', city:'Las Vegas, NV 89101', beds:4, baths:3, sqft:'2,100', badge:'Foreclosure', badgeClass:'badge-red', ...agent(0) },
      { id:8, image:'https://picsum.photos/id/137/600/400', price:'$115,000', address:'67 Magnolia Way', city:'Shreveport, LA 71101', beds:2, baths:1, sqft:'920', badge:'Foreclosure', badgeClass:'badge-red', ...agent(1) },
      { id:9, image:'https://picsum.photos/id/138/600/400', price:'$240,000', address:'18 Dogwood Trail', city:'Birmingham, AL 35201', beds:3, baths:2, sqft:'1,350', badge:'Foreclosure', badgeClass:'badge-red', ...agent(2) },
      { id:10, image:'https://picsum.photos/id/139/600/400', price:'$350,000', address:'44 Oak Hollow Ct', city:'Indianapolis, IN 46201', beds:4, baths:2, sqft:'1,800', badge:'Foreclosure', badgeClass:'badge-red', ...agent(3) },
      { id:11, image:'https://picsum.photos/id/140/600/400', price:'$135,000', address:'100 Spruce Ave', city:'Kansas City, MO 64101', beds:2, baths:1, sqft:'960', badge:'Foreclosure', badgeClass:'badge-red', ...agent(4) },
      { id:12, image:'https://picsum.photos/id/141/600/400', price:'$290,000', address:'7 Birch Way', city:'Richmond, VA 23220', beds:3, baths:2, sqft:'1,430', badge:'Foreclosure', badgeClass:'badge-red', ...agent(5) },
      { id:13, image:'https://picsum.photos/id/142/600/400', price:'$192,000', address:'29 Elm Grove Blvd', city:'Akron, OH 44301', beds:3, baths:1, sqft:'1,180', badge:'Foreclosure', badgeClass:'badge-red', ...agent(0) },
    ]
  },
};

export function getCategoryData(slug: string): CategoryInfo | null {
  return LISTINGS_DATA[slug] || null;
}

export function getAllCategories(): CategoryInfo[] {
  return Object.values(LISTINGS_DATA);
}

export function getProperty(categorySlug: string, id: number): Property | null {
  const cat = LISTINGS_DATA[categorySlug];
  if (!cat) return null;
  return cat.properties.find(p => p.id === id) || null;
}

