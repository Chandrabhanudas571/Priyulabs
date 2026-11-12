/**
 * PriyuLabs Universal Menu & Dynamic Page Catalog Data
 * Single source of truth for categories, sectors, solutions, and generated pages.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MENU_DATA = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var businessTypes = [
    {
      categorySlug: 'food-beverage',
      categoryTitle: 'Food & Beverage',
      description: 'Complete operational software for restaurants, cafes, cloud kitchens, bakeries, and bars.',
      sectors: [
        {
          slug: 'overview',
          url: '/restaurants-fine-dining',
          title: 'Overview',
          isPrimary: true
        },
        {
          slug: 'restaurants-fine-dining',
          url: '/restaurants-fine-dining',
          title: 'Restaurants & Fine Dining'
        },
        {
          slug: 'qsr-fast-food',
          url: '/qsr-fast-food',
          title: 'QSR, Fast Food & Takeaway'
        },
        {
          slug: 'cafes-chai-bars',
          url: '/cafes-chai-bars',
          title: 'Cafes & Chai Bars'
        },
        {
          slug: 'cloud-kitchens-catering',
          url: '/cloud-kitchens-catering',
          title: 'Cloud Kitchens & Catering'
        },
        {
          slug: 'bakeries-shops',
          url: '/bakeries-shops',
          title: 'Bakeries & Patisseries'
        },
        {
          slug: 'bars-pubs-breweries',
          url: '/bars-pubs-breweries',
          title: 'Bars, Pubs & Breweries'
        }
      ]
    },
    {
      categorySlug: 'retail',
      categoryTitle: 'Retail',
      description: 'High-speed barcode scanning, inventory replenishment, and customer credit ledgers for retail merchants.',
      sectors: [
        {
          slug: 'overview',
          url: '/grocery-supermarkets-kirana',
          title: 'Overview',
          isPrimary: true
        },
        {
          slug: 'grocery-supermarkets-kirana',
          url: '/grocery-supermarkets-kirana',
          title: 'Grocery, Supermarkets & Kirana Stores'
        },
        {
          slug: 'electronics-mobile-shops',
          url: '/electronics-mobile-shops',
          title: 'Electronics & Mobile Shops'
        },
        {
          slug: 'footwear-leather-stores',
          url: '/footwear-leather-stores',
          title: 'Footwear & Leather Stores'
        },
        {
          slug: 'jewellery-shops',
          url: '/jewellery-shops',
          title: 'Jewellery Showrooms & Bullion'
        },
        {
          slug: 'watch-stores',
          url: '/watch-stores',
          title: 'Watch Stores & Horology Boutiques'
        },
        {
          slug: 'bookstores-stationery',
          url: '/bookstores-stationery',
          title: 'Bookstores & Stationery Outlets'
        }
      ]
    },
    {
      categorySlug: 'beauty-fashion',
      categoryTitle: 'Beauty & Fashion',
      description: 'Streamlined appointment calendars, stylist commissions, and customer loyalty for wellness and fashion brands.',
      sectors: [
        {
          slug: 'overview',
          url: '/beauty-fashion/apparel',
          title: 'Overview',
          isPrimary: true
        },
        {
          slug: 'clothing-brands-apparel-boutiques',
          url: '/beauty-fashion/apparel',
          title: 'Clothing Brands & Apparel Boutiques'
        },
        {
          slug: 'salons-spas-beauty-parlors',
          url: '/beauty-fashion/salons',
          title: 'Salons, Spas & Beauty Parlors'
        },
        {
          slug: 'cosmetics-skincare-stores',
          url: '/beauty-fashion/cosmetics',
          title: 'Cosmetics & Skincare Stores'
        }
      ]
    },
    {
      categorySlug: 'services',
      categoryTitle: 'Services',
      description: 'Membership management, recurring subscriptions, and service dispatch for fitness and laundry centers.',
      sectors: [
        {
          slug: 'overview',
          url: '/services/gyms',
          title: 'Overview',
          isPrimary: true
        },
        {
          slug: 'gyms-fitness-studios-yoga-centers',
          url: '/services/gyms',
          title: 'Gyms, Fitness Studios & Yoga Centers'
        },
        {
          slug: 'dry-cleaners-laundry-shops',
          url: '/services/dry-cleaners',
          title: 'Dry Cleaners & Laundry Shops'
        }
      ]
    }
  ];

  var solutions = [
    {
      categorySlug: 'billing-pos',
      categoryTitle: 'Billing & POS',
      description: 'Ultra-fast counter billing, payment terminal sync, and order management.',
      items: [
        {
          slug: 'smart-pos',
          title: 'Smart POS',
          metaTitle: 'Smart POS Touch Billing System | PriyuLabs',
          metaDescription: 'Sub-second touchscreen billing, offline reliability, barcode scanning, and multi-device sync engineered for Indian retail and restaurants.',
          h1: 'Smart POS Touch Screen & Sub-Second Billing System',
          shortDescription: 'High-speed touch billing, 100% offline reliability, instant thermal receipt printing, and seamless barcode scanner integration.',
          problemsSolved: [
            {
              problem: 'Peak-Hour Queue Congestion',
              solution: 'Sub-second billing architecture processes transactions in 3 taps, eliminating checkout delays.'
            },
            {
              problem: 'Internet Outages Stopping Business',
              solution: 'Offline-first database architecture continues billing smoothly without internet connectivity.'
            },
            {
              problem: 'Cashier Operator Mistakes & Training Delays',
              solution: 'Intuitive visual touchscreen UI requires less than 10 minutes of cashier orientation.'
            },
            {
              problem: 'Discrepancies Between Counter Cash and Software',
              solution: 'Blind day-end cash reconciliation ensures transparent, tamper-proof shift handovers.'
            }
          ],
          features: [
            {
              title: 'Sub-Second Touch Checkout',
              description: 'Optimized touch grid designed for rapid high-volume counter operations.'
            },
            {
              title: '100% Offline Capability',
              description: 'Process transactions and print thermal receipts even during total broadband disconnection.'
            },
            {
              title: 'Universal Hardware Compatibility',
              description: 'Works with USB, Bluetooth, Ethernet thermal printers, barcode scanners, and cash drawers.'
            },
            {
              title: 'Multi-Terminal Counter Sync',
              description: 'Operate 5+ billing counters simultaneously with real-time centralized inventory updates.'
            },
            {
              title: 'Voice & Barcode Search',
              description: 'Find items instantly by voice command, SKU number, or barcode scan.'
            },
            {
              title: 'Digital WhatsApp Receipts',
              description: 'Send paperless, tax-compliant PDF receipts directly to customer WhatsApp numbers.'
            }
          ],
          faqs: [
            {
              question: 'What hardware does PriyuLabs Smart POS support?',
              answer: 'PriyuLabs runs on Windows, Android tablets, touch all-in-one POS terminals, and iPads.'
            },
            {
              question: 'Can multiple cashiers use separate counters at the same time?',
              answer: 'Yes. Multi-counter support allows multiple terminals to bill concurrently while sharing live inventory.'
            },
            {
              question: 'How does offline mode sync when the connection comes back?',
              answer: 'All offline bills, cash movements, and customer records sync silently in the background within seconds of reconnection.'
            },
            {
              question: 'Does it support barcode weighing scales?',
              answer: 'Yes. Standard weighing scales with RS232 or USB serial output connect seamlessly.'
            }
          ]
        },
        {
          slug: 'gst-billing',
          title: 'GST Billing',
          metaTitle: 'GST Invoicing & Tax Compliance Software | PriyuLabs',
          metaDescription: '1-click GSTR-1, GSTR-3B export, automated HSN/SAC code lookup, and B2B/B2C GST-compliant invoicing.',
          h1: '1-Click GST Invoicing & Compliance Filing System',
          shortDescription: 'Generate GST-compliant B2B and B2C tax invoices, automatic HSN/SAC code lookup, e-Way bills, and 1-click GSTR-1 return filing exports.',
          problemsSolved: [
            {
              problem: 'Stressful Month-End GST Return Preparation',
              solution: '1-click export of GSTR-1, GSTR-3B JSON and Excel formats ready for direct upload to GST portal.'
            },
            {
              problem: 'Incorrect Tax Slab Applications on Mixed Items',
              solution: 'Pre-configured 0%, 5%, 12%, 18%, and 28% GST rules apply automatically per line item.'
            },
            {
              problem: 'Customer GSTIN Verification Delays',
              solution: 'Instant GSTIN lookup validates buyer business details and legal trade name in real time.'
            },
            {
              problem: 'Manual e-Way Bill and e-Invoice Generation',
              solution: 'Automated generation of IRN and QR codes for B2B transactions meeting threshold requirements.'
            }
          ],
          features: [
            {
              title: '1-Click GSTR-1 & 3B Export',
              description: 'Download filing-ready JSON and CA-friendly Excel reports categorized by B2B, B2C Large, and B2C Small.'
            },
            {
              title: 'Instant GSTIN Legal Name Lookup',
              description: 'Enter a 15-digit GSTIN to automatically fetch legal business name, trade name, and registered address.'
            },
            {
              title: 'HSN / SAC Master Directory',
              description: 'Built-in directory of tax codes ensures zero penalty risks from incorrect tax filings.'
            },
            {
              title: 'B2B e-Invoicing & e-Way Bill',
              description: 'Direct API integration generates government-compliant IRN QR codes directly on invoices.'
            },
            {
              title: 'State & Central Split (CGST/SGST/IGST)',
              description: 'Automatic tax bifurcation based on buyer state and supply destination.'
            },
            {
              title: 'Reverse Charge & Composition Scheme',
              description: 'Full support for regular taxpayers, composition dealers, and reverse charge mechanisms.'
            }
          ],
          faqs: [
            {
              question: 'Can my Chartered Accountant directly use the exported reports?',
              answer: 'Yes. The Excel and JSON exports match government portal formats and standard Tally/Busy accounting schemas.'
            },
            {
              question: 'Does the software support composite GST schemes?',
              answer: 'Yes. Switch between Regular and Composition taxpayer modes in store settings.'
            },
            {
              question: 'What happens if government GST rates change?',
              answer: 'Tax rates can be updated centrally in one click without affecting historical sales invoices.'
            },
            {
              question: 'Can we print A4, A5, and thermal GST tax invoices?',
              answer: 'Yes. Multiple print templates are available for full A4 desktop printing and compact counter thermal rolls.'
            }
          ]
        },
        {
          slug: 'qr-upi-payments',
          title: 'QR & UPI Payments',
          metaTitle: 'Zero-Fraud UPI & Soundbox Payment Integration | PriyuLabs',
          metaDescription: 'Dynamic on-screen UPI QR codes, real-time soundbox voice confirmation, and zero-fraud EDC card machine integration.',
          h1: 'Zero-Fraud Dynamic Soundbox & EDC Terminal Sync',
          shortDescription: 'Dynamic per-bill QR codes, voice soundbox announcements, and credit card swipe machine synchronization eliminating manual payment fraud.',
          problemsSolved: [
            {
              problem: 'Fake UPI Payment Screenshots from Customers',
              solution: 'Dynamic QR displays the exact bill amount and software only prints receipt upon server bank confirmation.'
            },
            {
              problem: 'Cashiers Keying Wrong Amounts into Card Machines',
              solution: 'Exact invoice total is pushed directly to the EDC terminal without manual keypad entry.'
            },
            {
              problem: 'End-of-Day Bank Reconciliation Nightmares',
              solution: 'Automatic match between software sales records and bank settlement payouts in 1 screen.'
            },
            {
              problem: 'Slow Cashier Verification During Rush Hours',
              solution: 'Instant multilingual voice announcement verifies successful UPI payment within 1 second.'
            }
          ],
          features: [
            {
              title: 'Dynamic Per-Bill QR Code',
              description: 'Generates a customer-facing screen QR with exact payable amount and unique invoice transaction ID.'
            },
            {
              title: 'Zero-Fraud EDC Card Machine Push',
              description: 'Pushes exact total to Pine Labs, Paytm, or Innoviti EDC swipe machines with zero manual keying.'
            },
            {
              title: 'Multilingual Voice Soundbox',
              description: 'Clear audio confirmations in Hindi, English, Odia, Bengali, Tamil, Telugu, and Marathi.'
            },
            {
              title: 'Instant Settlement Dashboard',
              description: 'Monitor live UPI batches, credit card batches, and expected bank deposits in real time.'
            },
            {
              title: 'Split Tender Support',
              description: 'Accept partial payment via cash and remaining balance via UPI or credit card on a single bill.'
            },
            {
              title: 'Chargeback & Refund Protection',
              description: 'Complete digital trail linking bank RRN and UTR reference codes to the original invoice.'
            }
          ],
          faqs: [
            {
              question: 'Does PriyuLabs charge any additional transaction fee on UPI payments?',
              answer: 'No. Standard UPI transactions settle directly into your linked bank account with 0% PriyuLabs platform markup.'
            },
            {
              question: 'Which card machines can be integrated with PriyuLabs?',
              answer: 'We support major EDC terminals including Pine Labs, Paytm POS, Mswipe, and Innoviti.'
            },
            {
              question: 'Can customers scan with any UPI app (Google Pay, PhonePe, Paytm)?',
              answer: 'Yes. Dynamic BharatQR codes work with every BHIM UPI compliant app in India.'
            },
            {
              question: 'What happens if a customer payment is pending on their bank server?',
              answer: 'The cashier screen displays live polling status and offers 1-tap manual status re-check before releasing items.'
            }
          ]
        },
        {
          slug: 'table-order-management',
          title: 'Table/Order Management',
          metaTitle: 'Live Table & Order Management System | PriyuLabs',
          metaDescription: 'Visual floor plan, live table status, steward ordering, and kitchen display integration for food and hospitality businesses.',
          h1: 'Live Table Ordering, KOT & Kitchen Sync System',
          shortDescription: 'Interactive floor layouts, table status indicators, mobile steward order punching, split billing, and multi-kitchen order routing.',
          problemsSolved: [
            {
              problem: 'Stewards Running Back and Forth to Kitchen',
              solution: 'Mobile phone steward app punches orders right at the table and prints in the kitchen instantly.'
            },
            {
              problem: 'Table Mixing & Order Transposition Errors',
              solution: 'Interactive visual floor map displays seated, vacant, billed, and cleaning tables with color coding.'
            },
            {
              problem: 'Disputes on Table Merging and Splitting',
              solution: '1-tap drag-and-drop table merging for large parties and instant check splitting by guest or item.'
            },
            {
              problem: 'Slow Bill Delivery After Meal Completion',
              solution: 'Stewards request bills from their phone terminal; printed receipt and UPI QR are delivered in 30 seconds.'
            }
          ],
          features: [
            {
              title: 'Customizable Multi-Floor Plan',
              description: 'Design your exact floor layout with indoor tables, outdoor terrace, and private dining rooms.'
            },
            {
              title: 'Steward Mobile POS',
              description: 'Waitstaff punch orders, add special kitchen instructions, and fire KOTs from any smartphone.'
            },
            {
              title: 'Multi-Kitchen KOT Routing',
              description: 'Route drink items to the bar printer and food items to hot and cold kitchen stations automatically.'
            },
            {
              title: 'Live Table Timer & Status Alerts',
              description: 'Highlight tables seated for over 45 minutes without food delivery to ensure customer satisfaction.'
            },
            {
              title: 'Table QR Ordering Integration',
              description: 'Allow guests to scan table QR code to browse pictures, order additional rounds, and pay online.'
            },
            {
              title: 'Void & Item Cancellation Audit',
              description: 'Track canceled KOT items with mandatory manager reason codes to eliminate staff theft.'
            }
          ],
          faqs: [
            {
              question: 'Can stewards use their personal Android phones to take orders?',
              answer: 'Yes. The responsive steward interface runs on any smartphone browser with secure staff authentication.'
            },
            {
              question: 'What happens if two stewards try to order on the same table simultaneously?',
              answer: 'Real-time WebSocket locks prevent concurrent order conflicts and merge orders cleanly into the master table bill.'
            },
            {
              question: 'Can we move an active table to a different table number?',
              answer: 'Yes. 1-tap table transfer moves all punched items and active KOT tickets to the new table.'
            },
            {
              question: 'Does it support pre-booking table reservations?',
              answer: 'Yes. Manage upcoming reservations with guest name, party size, arrival time, and deposit records.'
            }
          ]
        }
      ]
    },
    {
      categorySlug: 'inventory',
      categoryTitle: 'Inventory',
      description: 'Accurate stock levels, automated supplier re-orders, and batch expiration alerts.',
      items: [
        {
          slug: 'stock-tracking',
          title: 'Stock Tracking',
          metaTitle: 'Real-Time Inventory & Stock Tracking Software | PriyuLabs',
          metaDescription: 'Multi-store inventory sync, barcode scanning, stock variance audits, and automated shrinkage detection for retailers.',
          h1: 'Multi-Store Real-Time Stock & Barcode Tracking System',
          shortDescription: 'End-to-end stock visibility across warehouses and retail shelves, serial/batch tracking, barcode scanning, and stock audit variance reports.',
          problemsSolved: [
            {
              problem: 'Ghost Stock & Discrepancies Between System and Shelf',
              solution: 'Cycle count physical auditing tool catches inventory shrinkage and theft early.'
            },
            {
              problem: 'Stock Sitting Trapped in One Branch While Another Starves',
              solution: 'Multi-store inventory visibility enables 1-click inter-branch stock transfers and rebalancing.'
            },
            {
              problem: 'Manual Barcode Entering Slowing Inward Stocking',
              solution: 'Batch inwarding via barcode scanner adds 100 units to inventory in less than 2 minutes.'
            },
            {
              problem: 'Lack of Insight into True Gross Profit Margins',
              solution: 'Weighted average cost (FIFO/WAC) tracking computes exact gross margins after supplier discounts.'
            }
          ],
          features: [
            {
              title: 'Live Multi-Location Inventory',
              description: 'Track stock balances across main warehouse, store backroom, and front-shelf displays in real time.'
            },
            {
              title: 'Barcode Scanning Inward & Dispatch',
              description: 'Scan supplier cartons and goods-received notes to update inventory counts with zero manual typing.'
            },
            {
              title: 'Physical Audit Cycle Counting',
              description: 'Conduct partial stock audits on mobile devices without shutting down daily store sales operations.'
            },
            {
              title: 'Inter-Branch Stock Transfers (STN)',
              description: 'Generate formal stock transfer notes with dispatch approval and destination receipt confirmation.'
            },
            {
              title: 'Damage & Shrinkage Logging',
              description: 'Segregate damaged, broken, or expired merchandise into quarantine locations for insurance logs.'
            },
            {
              title: 'Cost of Goods Sold (COGS) Engine',
              description: 'Automated FIFO and weighted average valuation provides accurate net profit insights.'
            }
          ],
          faqs: [
            {
              question: 'Can we manage inventory across 5 branches from one central dashboard?',
              answer: 'Yes. Owners and procurement managers get real-time stock balances across all retail locations.'
            },
            {
              question: 'Does the software support wireless barcode scanning for audits?',
              answer: 'Yes. Compatible with standard Bluetooth wireless scanners and camera-based mobile scanning.'
            },
            {
              question: 'How does the system calculate profit when purchase prices fluctuate?',
              answer: 'The system uses weighted average cost or FIFO accounting to reflect accurate purchase price changes.'
            },
            {
              question: 'Can we track stock by serial number or batch code?',
              answer: 'Yes. Full serialized inventory tracking is supported for electronics, luxury goods, and pharmaceuticals.'
            }
          ]
        },
        {
          slug: 'low-stock-alerts',
          title: 'Low-Stock Alerts',
          metaTitle: 'Automated Low-Stock Alerts & Reorder Software | PriyuLabs',
          metaDescription: 'Never lose a sale to stockouts with automated reorder levels, supplier WhatsApp alert dispatch, and lead-time estimation.',
          h1: 'Automated Reorder Level & Supplier Alert System',
          shortDescription: 'Dynamic minimum threshold monitoring, automated supplier WhatsApp reorder dispatch, and sales velocity forecasting to prevent stockouts.',
          problemsSolved: [
            {
              problem: 'Losing Loyal Customers Due to Unnoticed Stockouts',
              solution: 'Automated alert triggers when stock dips below safe minimum threshold levels.'
            },
            {
              problem: 'Over-Ordering Stale Slow-Moving Inventory',
              solution: 'Sales velocity analytics suggest exact purchase quantities based on past 30 days of actual demand.'
            },
            {
              problem: 'Distributor Reorder Delays',
              solution: '1-click purchase order dispatch directly to distributor WhatsApp number with itemized quantities.'
            },
            {
              problem: 'Seasonal Demand Spikes Catching Stores Off-Guard',
              solution: 'Seasonal buffer configuration increases safety stock levels ahead of festival holidays.'
            }
          ],
          features: [
            {
              title: 'Automated Reorder Point Trigger',
              description: 'Set custom minimum safety thresholds per item or let AI calculate dynamic buffer levels.'
            },
            {
              title: '1-Click WhatsApp Purchase Orders',
              description: 'Generate clean purchase order PDFs and send them directly to vendor WhatsApp chats.'
            },
            {
              title: 'Sales Velocity & Run-Rate Forecasting',
              description: 'Projects days-of-stock remaining based on current daily consumption and supplier lead times.'
            },
            {
              title: 'Central Multi-Vendor Grouping',
              description: 'Aggregates all low-stock items from the same distributor into a single consolidated purchase order.'
            },
            {
              title: 'SMS & Email Owner Notifications',
              description: 'Daily morning executive summary highlighting top 10 critical items running low across branches.'
            },
            {
              title: 'Festival & Seasonal Stock Buffers',
              description: 'Easily adjust threshold multipliers for Diwali, Eid, New Year, or summer holiday surges.'
            }
          ],
          faqs: [
            {
              question: 'Can the system automatically send purchase orders to suppliers?',
              answer: 'Yes. You can review and approve auto-generated purchase orders, or configure automated WhatsApp dispatch.'
            },
            {
              question: 'How are reorder levels calculated for new products?',
              answer: 'You can set initial manual minimum limits; once 14 days of sales history is recorded, smart velocity recommendations activate.'
            },
            {
              question: 'Can we group low-stock items by specific distributors?',
              answer: 'Yes. Items are linked to primary suppliers so you can reorder all catalog items from one distributor together.'
            },
            {
              question: 'Does it notify managers on their mobile phone?',
              answer: 'Yes. Daily push notifications and WhatsApp summaries keep owners informed of low inventory.'
            }
          ]
        },
        {
          slug: 'supplier-management',
          title: 'Supplier Management',
          metaTitle: 'Supplier & Vendor Purchase Management Software | PriyuLabs',
          metaDescription: 'Manage vendor ledgers, purchase returns, payment terms, and Goods Received Note (GRN) verification.',
          h1: 'Supplier Purchase Orders & AP Ledger Management',
          shortDescription: 'Central vendor directory, Goods Received Note (GRN) matching, purchase return debit notes, and Accounts Payable ledger tracking.',
          problemsSolved: [
            {
              problem: 'Paying for Damaged or Missing Supplier Goods',
              solution: 'GRN physical verification matches items received at loading dock against original purchase orders.'
            },
            {
              problem: 'Disputes Over Vendor Credit & Payment Dues',
              solution: 'Automated Accounts Payable (AP) ledger tracks credit days, payments made, and pending dues.'
            },
            {
              problem: 'Unorganized Purchase Return Debit Notes',
              solution: 'Generate formal GST debit notes for defective goods returned to suppliers with instant balance offset.'
            },
            {
              problem: 'Losing Track of Vendor Price Increases',
              solution: 'Historical purchase price tracking alerts you when a vendor increases item cost without notice.'
            }
          ],
          features: [
            {
              title: 'Goods Received Note (GRN) Match',
              description: 'Verify received items, batch numbers, and prices against original purchase orders before approving payments.'
            },
            {
              title: 'Accounts Payable Ledger',
              description: 'Complete vendor credit passbook tracking invoice dates, credit terms (15/30 days), and payment history.'
            },
            {
              title: 'GST Purchase Return & Debit Notes',
              description: 'Issue tax-compliant debit notes for damaged stock, automatically credited against future vendor payments.'
            },
            {
              title: 'Vendor Price Comparison',
              description: 'Compare purchase rates across multiple suppliers to identify best pricing and delivery reliability.'
            },
            {
              title: 'Direct Bank NEFT/RTGS Batch Payouts',
              description: 'Export vendor payment advice files ready for 1-click batch upload to your business net banking portal.'
            },
            {
              title: 'Supplier Performance Scorecard',
              description: 'Track on-time delivery rates, item defect percentages, and fulfillment accuracy per vendor.'
            }
          ],
          faqs: [
            {
              question: 'Can we record partial deliveries against a single purchase order?',
              answer: 'Yes. PriyuLabs tracks partial fulfillments and keeps the remaining balance open until final delivery.'
            },
            {
              question: 'Does the software generate debit notes for returned damaged goods?',
              answer: 'Yes. Standard GST debit notes are generated and adjusted against outstanding supplier invoices.'
            },
            {
              question: 'Can we set payment due date alerts for supplier bills?',
              answer: 'Yes. The system alerts you 3 days before payment deadlines to preserve vendor credit relationships.'
            },
            {
              question: 'Can we attach PDF copies of original vendor invoices to entries?',
              answer: 'Yes. Upload digital scans or photo snaps of supplier bills directly to purchase records for audit compliance.'
            }
          ]
        }
      ]
    },
    {
      categorySlug: 'staff-payroll',
      categoryTitle: 'Staff & Payroll',
      description: 'Geofenced attendance, shift scheduling, and error-free payroll calculation.',
      items: [
        {
          slug: 'attendance',
          title: 'Attendance',
          metaTitle: 'Staff Attendance & Biometric HRMS Software | PriyuLabs',
          metaDescription: 'Selfie biometric attendance with GPS geofencing, QR check-in, overtime tracking, and automatic late-entry penalties.',
          h1: 'Selfie & Biometric Geofenced Staff Attendance System',
          shortDescription: 'Prevent proxy attendance with facial selfie verification, GPS store geofencing, biometric turnstile integration, and automated shift hour tracking.',
          problemsSolved: [
            {
              problem: 'Buddy Punching & Proxy Staff Attendance Fraud',
              solution: 'Selfie camera check-in with AI face match ensures only the actual employee can record attendance.'
            },
            {
              problem: 'Staff Punching In from Home Before Arriving at Store',
              solution: 'Strict GPS geofencing restricts clock-in to within 50 meters of your physical store address.'
            },
            {
              problem: 'Late Arrivals Disrupting Morning Store Openings',
              solution: 'Automated grace period rules log late marks and deduct half-day pay after 3 consecutive late arrivals.'
            },
            {
              problem: 'Manual Paper Registers Misplaced at Month-End',
              solution: 'Cloud attendance records automatically feed into monthly salary calculation without manual data entry.'
            }
          ],
          features: [
            {
              title: 'Geofenced Mobile Selfie Clock-In',
              description: 'Staff clock in on their smartphones; AI verifies their selfie and GPS confirms store presence.'
            },
            {
              title: 'Tablet Reception Kiosk Mode',
              description: 'Place a budget tablet at staff entrance where employees tap their PIN or scan a QR badge.'
            },
            {
              title: 'Biometric Machine Direct Sync',
              description: 'Connect existing fingerprint and facial recognition attendance hardware via local Wi-Fi sync.'
            },
            {
              title: 'Overtime & Half-Day Calculation',
              description: 'Automatic calculation of overtime hours, break times, and half-day deductions based on shift rules.'
            },
            {
              title: 'Leave & Permission Requests',
              description: 'Employees request casual leave or emergency time-off on mobile; managers approve in 1 tap.'
            },
            {
              title: 'Real-Time Store Staffing Board',
              description: 'Owners can check from anywhere which employees are currently on duty across all store locations.'
            }
          ],
          faqs: [
            {
              question: 'Can staff fake their GPS location with spoofing apps?',
              answer: 'No. PriyuLabs features anti-mock location detection that flags and blocks simulated GPS coordinates.'
            },
            {
              question: 'Does the system support rotational day and night shifts?',
              answer: 'Yes. You can assign staff to morning, evening, or night shifts with automatic shift identification.'
            },
            {
              question: 'Can managers correct attendance for staff who forgot to punch out?',
              answer: 'Yes. Authorized managers can edit shift logs with mandatory audit reason notes.'
            },
            {
              question: 'Does attendance data connect directly to salary calculation?',
              answer: 'Yes. Present days, paid leaves, late deductions, and overtime flow seamlessly into monthly payroll.'
            }
          ]
        },
        {
          slug: 'shifts-scheduling',
          title: 'Shifts & Scheduling',
          metaTitle: 'Staff Shift Scheduling & Roster Management Software | PriyuLabs',
          metaDescription: 'Create conflict-free weekly work rosters, handle staff shift swaps, and send automated WhatsApp schedule notifications.',
          h1: 'Roster Planning & Auto-Shift Scheduling System',
          shortDescription: 'Drag-and-drop weekly work rosters, staff shift swap approvals, minimum coverage alerts, and WhatsApp shift schedule broadcasts.',
          problemsSolved: [
            {
              problem: 'Staff Not Knowing Their Weekly Roster',
              solution: 'Publish rosters and send automated weekly WhatsApp schedule alerts directly to each staff member.'
            },
            {
              problem: 'Store Understaffed During Busy Weekend Rush',
              solution: 'Minimum staffing threshold alerts warn managers if peak hours lack sufficient cashier or steward coverage.'
            },
            {
              problem: 'Shift Swap Confusion and Missed Work Days',
              solution: 'Staff initiate shift exchanges on mobile; manager approval auto-updates the master work schedule.'
            },
            {
              problem: 'Labor Law Working Hour Violations',
              solution: 'Enforce statutory weekly working hour limits and mandatory rest days between consecutive shifts.'
            }
          ],
          features: [
            {
              title: 'Visual Drag-and-Drop Shift Planner',
              description: 'Easily schedule shifts across morning, general, evening, and split shifts on an intuitive grid.'
            },
            {
              title: 'Automated WhatsApp Schedule Broadcast',
              description: 'Send personalized weekly shift schedules to all team members with 1 click.'
            },
            {
              title: 'Peer-to-Peer Shift Swap Approvals',
              description: 'Staff find replacements for sick days and submit swaps for manager sign-off.'
            },
            {
              title: 'Peak-Hour Coverage Optimization',
              description: 'Align staffing levels with historical hourly POS sales volume to avoid overstaffing or shortages.'
            },
            {
              title: 'Weekly Off & Holiday Management',
              description: 'Assign rotating weekly off days while maintaining constant store operational readiness.'
            },
            {
              title: 'Multi-Location Staff Deployment',
              description: 'Assign floating senior supervisors to different store branches across different days of the week.'
            }
          ],
          faqs: [
            {
              question: 'Can staff request shift changes on their mobile phones?',
              answer: 'Yes. Employees can propose shift swaps with available colleagues, which takes effect once a manager approves.'
            },
            {
              question: 'Does the schedule warn managers if someone is double-scheduled?',
              answer: 'Yes. Built-in conflict detection prevents accidental double-booking of employees on overlapping shifts.'
            },
            {
              question: 'Can we set up recurring shift schedules for full-time staff?',
              answer: 'Yes. Recurring roster templates can be duplicated across weeks with 1 click.'
            },
            {
              question: 'How do employees view their shift schedule?',
              answer: 'They receive an automated WhatsApp notification and can view their live roster on the staff mobile portal.'
            }
          ]
        },
        {
          slug: 'payroll',
          title: 'Payroll',
          metaTitle: 'Staff Payroll & Salary Calculation Software | PriyuLabs',
          metaDescription: '1-click monthly salary generation, PF/ESIC deductions, advance Khata tracking, and digital WhatsApp payslips.',
          h1: '1-Click Salary Calculation, PF/ESIC & Advance Khata System',
          shortDescription: 'Automated net salary calculations, staff advance and loan khata deductions, PF & ESIC statutory reports, and digital WhatsApp payslips.',
          problemsSolved: [
            {
              problem: 'Spending 3 Days Every Month Calculating Salaries',
              solution: '1-click salary generator computes basic, HRA, overtime, and deductions from attendance in 10 seconds.'
            },
            {
              problem: 'Forgetting Mid-Month Staff Cash Advances',
              solution: 'Integrated advance ledger automatically deducts mid-month cash advances from final monthly payouts.'
            },
            {
              problem: 'Staff Questioning Monthly Salary Deductions',
              solution: 'Detailed WhatsApp payslips provide full transparency on attendance, overtime hours, and deductions.'
            },
            {
              problem: 'Statutory PF & ESIC Compliance Calculation Errors',
              solution: 'Automatic deduction calculation of Provident Fund, ESIC, and Professional Tax (PT) per state rules.'
            }
          ],
          features: [
            {
              title: '1-Click Monthly Payroll Engine',
              description: 'Processes full store payroll instantly combining attendance logs, incentive bonuses, and advance deductions.'
            },
            {
              title: 'Staff Advance & Loan Ledger',
              description: 'Log mid-month cash loans and advance requests with automated recovery over scheduled pay periods.'
            },
            {
              title: 'Digital WhatsApp Payslip Delivery',
              description: 'Send encrypted, professional PDF salary slips directly to employee WhatsApp accounts on payday.'
            },
            {
              title: 'Bank Bulk Transfer Excel File',
              description: 'Download standard corporate net-banking Excel sheets for 1-click batch salary disbursement.'
            },
            {
              title: 'PF, ESIC & PT Statutory Reports',
              description: 'Auto-maintained compliance reports ready for monthly ECR portal filing and audit records.'
            },
            {
              title: 'Sales Commission & Tip Distribution',
              description: 'Seamlessly fold stylist, promoter, or waiter tips and commissions into monthly salary disbursements.'
            }
          ],
          faqs: [
            {
              question: 'Does the payroll system automatically deduct staff advances?',
              answer: 'Yes. Any advance logged during the month is automatically deducted from that employee’s net payout.'
            },
            {
              question: 'Can we disburse salaries via our business bank account batch file?',
              answer: 'Yes. Export standard batch payout files compatible with HDFC, ICICI, SBI, Axis, and other major banks.'
            },
            {
              question: 'Are payslips sent to staff automatically?',
              answer: 'Yes. Once payroll is approved, digital payslip PDFs can be dispatched to all staff via WhatsApp in 1 click.'
            },
            {
              question: 'Does it support daily-wage and hourly staff?',
              answer: 'Yes. You can configure monthly salaried, daily-wage, or hourly rate pay structures for different staff tiers.'
            }
          ]
        }
      ]
    },
    {
      categorySlug: 'growth-marketing',
      categoryTitle: 'Growth & Marketing',
      description: 'Customer CRM profiles, automated WhatsApp campaigns, and custom e-commerce storefronts.',
      items: [
        {
          slug: 'customer-crm',
          title: 'Customer CRM',
          metaTitle: 'Retail Customer CRM & Purchase History Software | PriyuLabs',
          metaDescription: 'Build high-value customer profiles, analyze lifetime purchase value, segment regular buyers, and drive repeat visits.',
          h1: 'Centralized Customer Profiles & Purchase History Vault',
          shortDescription: 'Capture customer mobile numbers at billing, track lifetime spend, segment high-value VIP buyers, and personalize counter greetings.',
          problemsSolved: [
            {
              problem: 'Treating a 5-Year VIP Customer Like a First-Time Stranger',
              solution: 'Counter screen displays customer lifetime spend, total visits, and preferred items the moment mobile is entered.'
            },
            {
              problem: 'Customer Contact Numbers Trapped in Paper Registers',
              solution: 'Every billing counter transaction enriches the centralized digital customer database automatically.'
            },
            {
              problem: 'Losing High-Spenders Who Have Stopped Visiting',
              solution: 'Dormant customer analytics flag buyers who have not returned in 45 days for win-back campaigns.'
            },
            {
              problem: 'Irrelevant Mass Promotional Spam Annoying Customers',
              solution: 'Segment customers by purchase frequency, average basket size, and favorite categories for relevant offers.'
            }
          ],
          features: [
            {
              title: 'Countertop Customer Identification',
              description: 'Enter customer phone number to instantly view name, loyalty tier, credit balance, and favorite items.'
            },
            {
              title: 'Lifetime Value (LTV) Analytics',
              description: 'Automatically segment customers into Platinum, Gold, Regular, and New shopper tiers.'
            },
            {
              title: 'Dormant Customer Win-Back Radar',
              description: 'Identify past regular shoppers who have not shopped in 60+ days and send personalized re-engagement offers.'
            },
            {
              title: 'Birthday & Anniversary Automations',
              description: 'Automated celebratory WhatsApp greeting messages with exclusive birthday shopping discounts.'
            },
            {
              title: 'Customer Notes & Preferences',
              description: 'Record allergy details, tailor measurements, preferred seating, or coffee roast choices.'
            },
            {
              title: 'Multi-Store Shared Customer Master',
              description: 'Customers earn and redeem rewards seamlessly across all your brand’s retail branches.'
            }
          ],
          faqs: [
            {
              question: 'Do customers need to download an app to join the CRM?',
              answer: 'No app download is required. Customers are enrolled with just their mobile number during standard billing.'
            },
            {
              question: 'Can cashiers see past purchases to recommend complementary items?',
              answer: 'Yes. The POS terminal shows recent purchase history to enable personalized upselling.'
            },
            {
              question: 'Is customer data private to my business?',
              answer: 'Yes. Your customer data belongs exclusively to your business and is never shared or monetized.'
            },
            {
              question: 'Can we import our existing customer list from Excel?',
              answer: 'Yes. Upload your existing customer CSV file to bring past balances and contact details into PriyuLabs.'
            }
          ]
        },
        {
          slug: 'loyalty-offers',
          title: 'Loyalty & Offers',
          metaTitle: 'Retail Loyalty Programs & Cashback Points Software | PriyuLabs',
          metaDescription: 'Point-based cashbacks, digital stamp cards, promotional discount rules, and tier rewards that keep retail customers returning.',
          h1: 'Cashback Points, Stamp Cards & Tiered Loyalty System',
          shortDescription: 'Reward repeat shoppers with points-based cashback, digital WhatsApp punch stamp cards, tiered VIP perks, and automated birthday vouchers.',
          problemsSolved: [
            {
              problem: 'Physical Plastic Loyalty Cards Lost in Drawers',
              solution: '100% phone-number based digital loyalty points passbook sent straight to customer WhatsApp.'
            },
            {
              problem: 'Shoppers Visiting Once and Never Returning',
              solution: 'Welcome loyalty reward points on first visit incentivize a second purchase within 14 days.'
            },
            {
              problem: 'Complex Coupon Redemption at Billing Counters',
              solution: 'Available loyalty points and vouchers display automatically on cashier screen during checkout.'
            },
            {
              problem: 'Staff Misusing Manual Discount Overrides',
              solution: 'System-enforced promotional rules eliminate unauthorized staff discount leaks.'
            }
          ],
          features: [
            {
              title: 'Dynamic Cashback Points Engine',
              description: 'Reward customers with percentage-based cashback points redeemable on future store purchases.'
            },
            {
              title: 'Digital WhatsApp Stamp Card',
              description: 'Coffee shop and salon punch cards: "Buy 9 Haircuts / Coffees, Get the 10th Free" on mobile.'
            },
            {
              title: 'Tiered VIP Progression',
              description: 'Silver, Gold, and Platinum status levels offering higher cashback rates as total spend increases.'
            },
            {
              title: 'Multi-Buy & Basket Promos',
              description: 'Configure "Buy 2 Get 1 Free", "Flat 20% Off on Bills Over ₹2,000", or category-specific discounts.'
            },
            {
              title: 'Expiring Reward Point Notifications',
              description: 'Alert customers 7 days before points expire to create urgency and drive repeat visits.'
            },
            {
              title: 'OTP Verified Redemption',
              description: 'Ensure point redemptions are authorized by the actual phone owner via secure SMS/WhatsApp OTP.'
            }
          ],
          faqs: [
            {
              question: 'Can customers redeem points at any branch?',
              answer: 'Yes. Loyalty point balances synchronize across all store locations in real time.'
            },
            {
              question: 'How do customers check their available point balance?',
              answer: 'Their balance is printed on every receipt and sent as an automated WhatsApp summary after every purchase.'
            },
            {
              question: 'Can we set points to expire after 6 months?',
              answer: 'Yes. Configurable point validity rules encourage customers to redeem before expiration.'
            },
            {
              question: 'Does the cashier need a manager PIN to apply loyalty points?',
              answer: 'Points can be redeemed automatically via OTP sent to customer mobile, preventing unauthorized redemptions.'
            }
          ]
        },
        {
          slug: 'whatsapp-campaigns',
          title: 'WhatsApp Campaigns',
          metaTitle: 'WhatsApp Marketing & Commerce Software | PriyuLabs',
          metaDescription: 'Broadcast personalized festive offers, interactive product catalogs, and automated recovery messages with official WhatsApp Business API.',
          h1: 'Automated WhatsApp Catalog, Offers & E-Receipts System',
          shortDescription: 'Official WhatsApp Business API integration to broadcast interactive catalogs, festive sales promotions, automated bill receipts, and payment reminders.',
          problemsSolved: [
            {
              problem: 'Low SMS Open Rates (Ignored in Spam Folders)',
              solution: 'WhatsApp messages enjoy 98% open rates and instant engagement within 15 minutes of sending.'
            },
            {
              problem: 'Getting Phone Numbers Banned for Bulk Messaging',
              solution: 'Built-in official Meta WhatsApp Cloud API with verified green tick and enterprise compliance.'
            },
            {
              problem: 'Paper Receipt Rolls Costing Thousands Monthly',
              solution: 'Digital WhatsApp e-receipts eliminate paper costs and capture verified customer contact data.'
            },
            {
              problem: 'High Customer Inquiries Overwhelming Front-Desk Staff',
              solution: 'Automated WhatsApp FAQ chatbot answers store timings, menu inquiries, and parking questions 24/7.'
            }
          ],
          features: [
            {
              title: 'Official Meta WhatsApp Cloud API',
              description: 'Enterprise-grade messaging without risk of number blocking or temporary delivery restrictions.'
            },
            {
              title: 'Interactive Catalog & Order Bot',
              description: 'Customers browse your digital menu or retail catalog and place orders straight within WhatsApp.'
            },
            {
              title: 'Personalized Festive Broadcasts',
              description: 'Send targeted Diwali, Eid, or New Year discount cards addressing customers by their first name.'
            },
            {
              title: 'Digital Paperless E-Receipts',
              description: 'Beautiful branded receipt messages with full itemized breakdown, tax details, and loyalty status.'
            },
            {
              title: '2-Way Customer Support Chat',
              description: 'Unified support inbox for receptionists to answer customer queries from a single desktop dashboard.'
            },
            {
              title: 'Click-to-WhatsApp Ad Integration',
              description: 'Connect Instagram and Facebook ads directly into conversational WhatsApp sales funnels.'
            }
          ],
          faqs: [
            {
              question: 'Do we need a separate business phone number for the WhatsApp API?',
              answer: 'We help you register any standard landline or mobile number on the official Meta WhatsApp Business Cloud platform.'
            },
            {
              question: 'Can we send images, videos, and PDF brochures in messages?',
              answer: 'Yes. Rich media messages including images, video previews, interactive buttons, and PDF invoices are supported.'
            },
            {
              question: 'Are promotional broadcasts compliant with Meta policies?',
              answer: 'Yes. All template messages are pre-approved through Meta’s official approval gateway.'
            },
            {
              question: 'Can customers reply to the WhatsApp messages?',
              answer: 'Yes. Replies appear in your central PriyuLabs messaging inbox where staff can respond immediately.'
            }
          ]
        },
        {
          slug: 'website-ads',
          title: 'Website & Ads',
          metaTitle: 'Custom Website Builder & Hyperlocal Ads | PriyuLabs',
          metaDescription: 'Get a custom branded e-commerce website delivered in 5 days, with Google Local SEO and Meta advertising managed for you.',
          h1: '5-Day Custom E-Commerce Website & Local Meta/Google Ads',
          shortDescription: 'Professional custom storefront built and launched in 5 days, synchronized with your store inventory, paired with high-converting local Google & Meta ads.',
          problemsSolved: [
            {
              problem: 'Waiting 3 Months for Unreliable Freelance Web Developers',
              solution: 'PriyuLabs deploys a high-speed, mobile-optimized custom branded storefront within 5 business days.'
            },
            {
              problem: 'Website Stock Out of Sync with Physical Store Shelves',
              solution: 'Single unified database: in-store sales instantly deduct online website inventory in real time.'
            },
            {
              problem: 'Wasting Money on Broad Generic Digital Ads with Zero Sales',
              solution: 'Hyperlocal 5km radius Meta and Google Ads target high-intent nearby customers seeking your products.'
            },
            {
              problem: 'Invisible on Google Maps When Local Buyers Search Nearby',
              solution: 'Complete Google Business Profile optimization and local SEO rankings for neighborhood discovery.'
            }
          ],
          features: [
            {
              title: '5-Day Turnaround Custom Website',
              description: 'High-speed, SEO-engineered e-commerce storefront tailored with your logo, colors, and products.'
            },
            {
              title: 'Unified Store & Web Inventory',
              description: 'Sell the last pair of shoes in your store, and it immediately reflects sold out on your website.'
            },
            {
              title: 'Hyperlocal Google & Meta Ads',
              description: 'Target customers within 3 to 10 km radius of your store searching for your specific product categories.'
            },
            {
              title: 'Google Maps Local SEO Optimization',
              description: 'Rank at the top of Google "Near Me" searches for your retail or restaurant category.'
            },
            {
              title: 'Integrated Payment Gateway & Shipping',
              description: 'Ready-to-use Razorpay, Cashfree, UPI, and Shiprocket delivery integration out of the box.'
            },
            {
              title: 'Mobile-First Progressive Web App (PWA)',
              description: 'Ultra-fast mobile loading speed (sub-second) designed to convert smartphone visitors into buyers.'
            }
          ],
          faqs: [
            {
              question: 'How fast can our custom e-commerce website be launched?',
              answer: 'Once your product catalog and branding assets are uploaded, your custom website goes live within 5 business days.'
            },
            {
              question: 'Does the website connect with our physical counter POS billing?',
              answer: 'Yes. Online orders appear directly on your billing POS terminal, and in-store sales deduct website stock automatically.'
            },
            {
              question: 'Who manages the Google and Meta ad campaigns?',
              answer: 'Our in-house digital marketing specialists create the ad creatives, manage targeting, and optimize your monthly ad spend.'
            },
            {
              question: 'Can we use our own custom domain name (e.g., yourbrand.com)?',
              answer: 'Yes. We connect your custom domain with free automatic SSL bank-grade encryption.'
            }
          ]
        }
      ]
    }
  ];

  return {
    businessTypes: businessTypes,
    solutions: solutions
  };
});

