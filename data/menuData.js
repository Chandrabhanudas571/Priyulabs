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
      description: 'Complete operational software for restaurants, cafes, cloud kitchens, and bakeries.',
      sectors: [
        {
          slug: 'cafe',
          url: '/cafes-chai-bars',
          title: 'Cafe',
          metaTitle: 'Cafe POS & Billing Software | PriyuLabs',
          metaDescription: 'Speed up coffee orders with sub-second touch billing, recipe inventory management, and digital WhatsApp receipts built for modern cafes.',
          h1: 'Smart POS & Management Software for Cafes',
          shortDescription: 'Sub-second touch billing, barista display sync, custom modifier matrix, and live ingredient deduction tailored for specialty cafes and coffee bars.',
          problemsSolved: [
            {
              problem: 'Long Morning Rush Counter Queues',
              solution: '1-tap touch POS with automated combo shortcuts processes takeaway orders in under 3 seconds.'
            },
            {
              problem: 'Milk and Coffee Bean Inventory Wastage',
              solution: 'Recipe-based auto-deduction tracks exact gram-level milk, syrup, and roast usage per cup brewed.'
            },
            {
              problem: 'Lost Table & Pickup Orders',
              solution: 'Kitchen Order Ticket (KOT) sync pushes takeaway and dine-in orders instantly to barista screens.'
            },
            {
              problem: 'High Customer Drop-off During Peak Hours',
              solution: 'QR-at-table dynamic digital menu enables customers to order and pay UPI straight from their phone.'
            }
          ],
          features: [
            {
              title: 'Sub-Second Touch POS',
              description: 'Intuitive touch interface with customizable quick-keys for espresso, brew variants, and baked pastries.'
            },
            {
              title: 'Barista Display System (BDS)',
              description: 'Color-coded digital ticket board organizes hot vs. iced beverage queues in chronological order.'
            },
            {
              title: 'Recipe & Ingredient Depletion',
              description: 'Gram-level raw material decrement ensures real-time dairy, oat-milk, and coffee bean stock accuracy.'
            },
            {
              title: 'WhatsApp Digital Loyalty Pass',
              description: 'Automated digital loyalty stamp cards sent to customer mobile numbers after every 5th coffee purchase.'
            },
            {
              title: 'Zero-Fraud UPI & EDC Sync',
              description: 'Direct integration with card swipe machines and soundboxes guarantees 100% matched shift settlements.'
            },
            {
              title: 'Offline Billing Reliability',
              description: 'Continuous offline queue billing keeps your counter running even when broadband connection drops.'
            }
          ],
          faqs: [
            {
              question: 'Does PriyuLabs Cafe POS work when the internet is down?',
              answer: 'Yes. PriyuLabs runs a local offline-first SQLite database cache. You can ring up bills and print receipts uninterrupted; data automatically synchronizes when connection returns.'
            },
            {
              question: 'Can I connect a thermal kitchen printer and cash drawer?',
              answer: 'Yes. It supports standard USB, Ethernet, and Bluetooth thermal printers (58mm and 80mm) as well as automatic RJ11 cash drawer kicks.'
            },
            {
              question: 'How does ingredient and recipe tracking work?',
              answer: 'You define recipes (e.g. 18g coffee beans + 200ml whole milk for Cappuccino). Each sale automatically deducts the ingredients from raw inventory in real time.'
            },
            {
              question: 'How long does onboarding and staff training take?',
              answer: 'Our intuitive interface allows new baristas and cashiers to learn the billing workflow in under 10 minutes.'
            }
          ]
        },
        {
          slug: 'restaurant',
          url: '/restaurants-fine-dining',
          title: 'Restaurant',
          metaTitle: 'Restaurant Billing & Fine Dining POS Software | PriyuLabs',
          metaDescription: 'Manage table layouts, live KOT routing, split billing, and multi-station kitchen operations with PriyuLabs Restaurant POS.',
          h1: 'Restaurant POS & Table Management Software',
          shortDescription: 'Multi-floor table layouts, instant KOT routing to kitchen stations, split billing, and raw material food costing designed for fine dining and casual restaurants.',
          problemsSolved: [
            {
              problem: 'Delayed Kitchen Order Communication',
              solution: 'Captain tablet ordering routes food items directly to kitchen and bar printers in less than a second.'
            },
            {
              problem: 'Messy Bill Splitting & Custom Discounts',
              solution: 'Split by seat, cover, or item with 1-click GST calculation and authorized manager discount overrides.'
            },
            {
              problem: 'High Raw Material Food Costing Spoilage',
              solution: 'Central kitchen stock transfer tracking with real-time yield and spoilage logs.'
            },
            {
              problem: 'Slow Table Turnaround During Weekends',
              solution: 'Visual floor plan with color-coded table occupancy status (vacant, seated, billed, cleaning).'
            }
          ],
          features: [
            {
              title: 'Visual Floor & Table Map',
              description: 'Multi-section floor plan with drag-and-drop table merging, moving, and reservation management.'
            },
            {
              title: 'Multi-Station KOT Routing',
              description: 'Automatically route appetizer tickets to the starter kitchen and cocktail tickets to the bar.'
            },
            {
              title: 'Split & Itemized Billing',
              description: 'Split checks by guest, percentage, or specific dish with zero manual calculation errors.'
            },
            {
              title: 'Captain Ordering Handheld',
              description: 'Android smartphone or tablet app allowing stewards to punch orders right at guest tables.'
            },
            {
              title: 'Food Costing & Portion Audit',
              description: 'Track dish cost variance and flag recipe changes that erode profit margins.'
            },
            {
              title: 'Zomato & Swiggy Central Sync',
              description: 'Consolidated online aggregator ordering with single-screen menu toggle and stock pause.'
            }
          ],
          faqs: [
            {
              question: 'Can we run Captain ordering on Android phones?',
              answer: 'Yes. Any modern Android phone or tablet can be used by stewards to manage table occupancy and punch KOTs.'
            },
            {
              question: 'Does it handle multi-tax GST slabs (5% vs 18% alcohol)?',
              answer: 'Yes. The system automatically applies appropriate GST rates to food vs. alcoholic beverages on itemized bills.'
            },
            {
              question: 'Can managers approve complimentary items or discounts remotely?',
              answer: 'Yes. Manager PIN overrides or mobile push notifications allow secure authorization of discounts.'
            },
            {
              question: 'How does daily night settlement work?',
              answer: 'One-click EOD day closing balances cash drawer, card slips, UPI batches, and pet-cash expenses with automatic manager summary.'
            }
          ]
        },
        {
          slug: 'bakery',
          url: '/bakeries-shops',
          title: 'Bakery',
          metaTitle: 'Bakery POS & Cake Order Management Software | PriyuLabs',
          metaDescription: 'Custom cake advance bookings, batch expiry management, and barcode labeling designed specifically for bakeries and patisseries.',
          h1: 'Bakery POS & Custom Order Management Software',
          shortDescription: 'Manage custom cake advance booking sheets, batch manufacturing expiry dates, weighing scale sync, and barcode labeling for bakeries and patisseries.',
          problemsSolved: [
            {
              problem: 'Custom Cake Order Miscommunication',
              solution: 'Dedicated advance order calendar with photo upload, flavor preferences, and delivery slot tracking.'
            },
            {
              problem: 'Silent Expiry of Fresh Cream Pastries',
              solution: 'Automated 24/48-hour shelf-life warning flags older batches for discount promotions before expiry.'
            },
            {
              problem: 'Weighing Scale Integration Friction',
              solution: 'Direct serial port integration reads exact gram weight from digital scales directly into the bill.'
            },
            {
              problem: 'Advance Payment Khata Errors',
              solution: 'Track advance deposits, remaining balance on pickup, and send WhatsApp confirmation slips.'
            }
          ],
          features: [
            {
              title: 'Advance Cake Booking Calendar',
              description: 'Log design references, delivery time slots, custom eggless requirements, and deposit balances.'
            },
            {
              title: 'Weighing Scale Direct Connect',
              description: 'Plug-and-play RS232 weighing scale support for loose cookies, chocolates, and dry snacks.'
            },
            {
              title: 'Batch & Expiry Date Printing',
              description: 'Print custom labels with manufacturing timestamp, best-before date, and ingredient highlights.'
            },
            {
              title: 'Production Planning Sheet',
              description: 'Aggregate upcoming weekend advance orders into a single raw ingredient prep requisition.'
            },
            {
              title: 'WhatsApp Pickup Reminders',
              description: 'Automatic WhatsApp notification sent to customer when cake has been iced and boxed.'
            },
            {
              title: 'Multi-Outlet Central Kitchen Dispatch',
              description: 'Transfer freshly baked inventory from base kitchen to retail branches with digital transit challans.'
            }
          ],
          faqs: [
            {
              question: 'Can customers upload reference photos for custom birthday cakes?',
              answer: 'Yes. Cashiers can attach reference photos and special notes directly to the order sheet on the POS.'
            },
            {
              question: 'Does the software support barcode scale stickers?',
              answer: 'Yes. The system reads weight-embedded barcodes (EAN-13 price/weight encoding) seamlessly.'
            },
            {
              question: 'How does it handle unsold fresh goods at the end of the day?',
              answer: 'A dedicated wastage and return ledger records daily shrinkage for accurate profit-and-loss accounting.'
            },
            {
              question: 'Can multi-branch bakeries share central recipes?',
              answer: 'Yes. Standard recipes and pricing can be locked centrally and synced across all retail outlets.'
            }
          ]
        },
        {
          slug: 'cloud-kitchen',
          url: '/cloud-kitchens-catering',
          title: 'Cloud Kitchen',
          metaTitle: 'Cloud Kitchen POS & Multi-Brand Management Software | PriyuLabs',
          metaDescription: 'Consolidate Swiggy, Zomato, and direct delivery orders across multiple virtual food brands from a single kitchen terminal.',
          h1: 'Cloud Kitchen & Multi-Brand Order Management System',
          shortDescription: 'One single screen to accept, prepare, and dispatch orders from Swiggy, Zomato, and direct WhatsApp storefronts across 10+ virtual brands.',
          problemsSolved: [
            {
              problem: 'Managing 5+ Aggregator Tablets on One Counter',
              solution: 'Single unified dashboard auto-accepts orders from all food delivery aggregators directly into 1 terminal.'
            },
            {
              problem: 'Menu Out-of-Stock Discrepancy',
              solution: '1-click central item toggle marks an ingredient or dish paused across all delivery platforms simultaneously.'
            },
            {
              problem: 'Kitchen Staff Rider Confusion',
              solution: 'Unified token numbering and bag label printing ensures riders pick up the right branded packages.'
            },
            {
              problem: 'High Platform Commissions',
              solution: 'Deploy your own branded zero-commission WhatsApp ordering storefront with integrated delivery tracking.'
            }
          ],
          features: [
            {
              title: 'Universal Aggregator Hub',
              description: 'Auto-accept Swiggy, Zomato, and Magicpin orders without needing multiple physical tablets.'
            },
            {
              title: 'Multi-Brand Kitchen Routing',
              description: 'Color-coded Kitchen Display System (KDS) separates prep queues for Biryani, Pizza, and Burger brands.'
            },
            {
              title: 'Direct WhatsApp Storefront',
              description: 'Take high-margin direct delivery orders via interactive WhatsApp catalog with live UPI payments.'
            },
            {
              title: 'Rider Handover Token System',
              description: 'Display ready-for-dispatch order tokens on an external TV screen for delivery executive pickup.'
            },
            {
              title: 'Packaging & Consumables Tracking',
              description: 'Track packaging containers, paper bags, and cutlery inventory per order to prevent leakage.'
            },
            {
              title: 'Central Stock & Preparation Logs',
              description: 'Monitor batch gravy, marination prep levels, and cross-brand raw ingredient consumption.'
            }
          ],
          faqs: [
            {
              question: 'Can we run 8 different virtual brands from 1 PriyuLabs account?',
              answer: 'Yes. You can manage unlimited virtual brands under a single cloud kitchen entity with isolated menu catalogs.'
            },
            {
              question: 'Does the system print delivery address slips?',
              answer: 'Yes. It automatically prints packaging bills with customer address, contact, and itemized instructions.'
            },
            {
              question: 'What happens if our kitchen reaches maximum capacity?',
              answer: 'You can tap "Busy Kitchen Mode" to automatically add prep buffer time or temporarily pause new incoming orders.'
            },
            {
              question: 'Can we connect third-party riders like Dunzo or Shadowfax?',
              answer: 'Yes. Integrated logistics APIs allow 1-click on-demand rider booking for direct customer orders.'
            }
          ]
        },
        {
          slug: 'juice-tea-shop',
          url: '/cafes-chai-bars',
          title: 'Juice & Tea Shop',
          metaTitle: 'Tea Shop & Juice Bar Quick Billing POS Software | PriyuLabs',
          metaDescription: 'High-volume rapid billing, soundbox UPI integration, and sugar/ice modifier shortcuts for tea stalls and fresh juice bars.',
          h1: 'Juice Bar & Tea Cafe Quick Billing POS Software',
          shortDescription: 'High-frequency counter billing designed for 500+ daily tokens, instant soundbox voice announcements, and customizable sweetness modifiers.',
          problemsSolved: [
            {
              problem: 'Evening Tea Rush Traffic Congestion',
              solution: '3-tap fast billing prints kitchen tokens in 1.5 seconds so queues keep moving rapidly.'
            },
            {
              problem: 'Unverified UPI Payment Cheating',
              solution: 'Directly synced QR soundbox announces exact payment receipt immediately, preventing fake screenshot fraud.'
            },
            {
              problem: 'Seasonal Fresh Fruit Spoilage',
              solution: 'Daily fresh fruit purchase intake tracking balances vendor crate weights against juice sales.'
            },
            {
              problem: 'Cash Register Mismatch with Hourly Staff',
              solution: 'Blind cashier shift closing ensures staff count actual cash before seeing the software balance.'
            }
          ],
          features: [
            {
              title: 'Rapid Token Generator',
              description: 'Large high-contrast touch keys designed for rapid 1-hand operation during busy rush hours.'
            },
            {
              title: 'Instant Voice UPI Soundbox',
              description: 'Real-time multilingual voice announcement verifies digital customer payments without phone checking.'
            },
            {
              title: 'Modifier & Sweetness Presets',
              description: 'Single-touch customization for "No Sugar", "Less Ice", "Extra Ginger", or "Large Cup".'
            },
            {
              title: 'Daily Perishable Fruit Intake',
              description: 'Log morning fruit crate rates and calculate daily gross profit margins per liter extracted.'
            },
            {
              title: 'Prepaid Wallet & Customer Khata',
              description: 'Digital recharge cards for regular neighborhood office customers to prepay monthly tea accounts.'
            },
            {
              title: 'Compact Hardware Friendly',
              description: 'Runs smoothly on Android POS handhelds, inexpensive touch terminals, or standard tablets.'
            }
          ],
          faqs: [
            {
              question: 'Can we use an inexpensive Android handheld POS device?',
              answer: 'Yes. PriyuLabs runs smoothly on portable handheld Android POS terminals with built-in thermal printers.'
            },
            {
              question: 'How fast can a cashier print a tea token?',
              answer: 'With touch shortcuts, a standard token is printed in under 2 seconds.'
            },
            {
              question: 'Does it support pre-paid corporate monthly tea accounts?',
              answer: 'Yes. You can maintain digital balance accounts for neighboring businesses with monthly statement generation.'
            },
            {
              question: 'What hardware do I need to get started?',
              answer: 'Just an Android tablet or POS machine and a receipt printer. You can be up and running in 10 minutes.'
            }
          ]
        }
      ]
    },
    {
      categorySlug: 'beauty-wellness',
      categoryTitle: 'Beauty & Wellness',
      description: 'Streamlined appointment calendars, stylist commissions, and customer loyalty for wellness brands.',
      sectors: [
        {
          slug: 'salon',
          url: '/salons-spas',
          title: 'Salon',
          metaTitle: 'Salon & Beauty Parlor Billing & Booking Software | PriyuLabs',
          metaDescription: 'Manage stylist chairs, appointment scheduling, tiered commission splits, and automated WhatsApp reminders with PriyuLabs Salon POS.',
          h1: 'Salon & Beauty Parlor Appointment and Billing Software',
          shortDescription: 'Real-time chair booking calendar, tiered stylist commission calculations, package memberships, and consumable back-bar product usage tracking.',
          problemsSolved: [
            {
              problem: 'Weekend Appointment Overlapping & Double-Booking',
              solution: 'Visual multi-chair booking calendar with stylist availability and appointment buffer times.'
            },
            {
              problem: 'Complex Stylist Commission Disputes',
              solution: 'Automated service vs. product commission calculation with daily transparent stylist performance slips.'
            },
            {
              problem: 'Expensive Back-Bar Color & Shampoo Waste',
              solution: 'Internal salon consumption logging tracks chemical tube and shampoo gram usage per client service.'
            },
            {
              problem: 'No-Shows and Late Cancellations',
              solution: 'Automated 2-hour WhatsApp appointment reminders with 1-tap confirmation and reschedule options.'
            }
          ],
          features: [
            {
              title: 'Multi-Stylist Booking Calendar',
              description: 'Color-coded schedule board displaying appointments by stylist, service chair, and treatment duration.'
            },
            {
              title: 'Tiered Commission Engine',
              description: 'Flexible commission tiers based on monthly service revenue targets, retail sales, and tip tracking.'
            },
            {
              title: 'Service Packages & Prepaid Wallets',
              description: 'Sell bridal packages, multi-session hair spa passes, and digital customer balance recharge cards.'
            },
            {
              title: 'Back-Bar Consumable Depletion',
              description: 'Deduct internal salon shampoo, dye, and cream usage from inventory separate from retail products.'
            },
            {
              title: 'WhatsApp Client Reminders',
              description: 'Automatic WhatsApp confirmation, 24-hr reminder, and automated post-service review collection.'
            },
            {
              title: 'Customer Service History & Notes',
              description: 'Store client hair dye formulas, skin sensitivity notes, and preferred beverage choices.'
            }
          ],
          faqs: [
            {
              question: 'Can stylists view their own daily commission on their phones?',
              answer: 'Yes. Stylists can have restricted mobile login access to view their own completed services and daily commission earnings.'
            },
            {
              question: 'Does the software support bridal package advance bookings?',
              answer: 'Yes. You can schedule multi-session treatments across multiple stylists with advance token deposits.'
            },
            {
              question: 'How are back-bar salon products tracked?',
              answer: 'Products used for services are marked as "Internal Consumption" and deducted from inventory without generating retail revenue.'
            },
            {
              question: 'Can customers book appointments online from Instagram or WhatsApp?',
              answer: 'Yes. PriyuLabs provides a shareable online booking link that integrates with your Instagram bio and WhatsApp messages.'
            }
          ]
        },
        {
          slug: 'spa',
          url: '/salons-spas',
          title: 'Spa',
          metaTitle: 'Spa & Wellness Center Management Software | PriyuLabs',
          metaDescription: 'Therapy room allocation, therapist schedules, package memberships, and aromatic inventory tracking for luxury spas.',
          h1: 'Luxury Spa & Wellness Center Management Software',
          shortDescription: 'Therapy room allocation, synchronized therapist schedules, annual membership packages, and essential oil inventory tracking for wellness centers.',
          problemsSolved: [
            {
              problem: 'Room & Therapist Scheduling Conflicts',
              solution: 'Smart resource booking ensures a therapist, steam room, and massage suite are never double-booked.'
            },
            {
              problem: 'Manual Membership Renewal Follow-Ups',
              solution: 'Automated WhatsApp membership alerts notify clients 15 days before treatment credit expiration.'
            },
            {
              problem: 'High Inventory Theft of Essential Oils',
              solution: 'Milliliter-level stock auditing and therapist requisition logs track luxury aroma oil consumption.'
            },
            {
              problem: 'Unorganized Client Health Notes',
              solution: 'Digital consultation intake form logs client pressure preferences, allergies, and therapy notes.'
            }
          ],
          features: [
            {
              title: 'Resource & Suite Management',
              description: 'Synchronized allocation of therapists, specialized therapy suites, steam baths, and jacuzzi rooms.'
            },
            {
              title: 'Annual Wellness Memberships',
              description: 'Flexible tiered passes (Gold, Platinum) with redeemable session balances and family sharing.'
            },
            {
              title: 'Therapist Rotation & Rest Balancing',
              description: 'Enforce mandatory rest gaps between deep-tissue sessions to preserve therapist energy and wellness.'
            },
            {
              title: 'Digital Health Intake Form',
              description: 'Clients complete health questionnaires and consent forms on a tablet prior to entering treatment.'
            },
            {
              title: 'Luxury Essential Oil Tracking',
              description: 'Gram/ml consumption tracking for premium oils, facial serums, and organic wellness scrubs.'
            },
            {
              title: 'Confidential Client Profiles',
              description: 'Encrypted storage of client therapy preferences, therapist gender preference, and medical alerts.'
            }
          ],
          faqs: [
            {
              question: 'Can a single booking reserve both a specific therapist and a specific room?',
              answer: 'Yes. PriyuLabs links therapist assignment directly with treatment suite availability to prevent conflicts.'
            },
            {
              question: 'How do membership credits work across family members?',
              answer: 'You can configure family membership accounts where primary members authorize dependents to redeem therapy credits.'
            },
            {
              question: 'Can we take advance booking deposits via UPI?',
              answer: 'Yes. Send an instant dynamic payment link via WhatsApp to secure appointment slots.'
            },
            {
              question: 'Does it support multi-location spa chains?',
              answer: 'Yes. Central cloud reporting lets owners monitor multi-center occupancy, therapist performance, and stock levels.'
            }
          ]
        },
        {
          slug: 'barbershop',
          url: '/salons-spas',
          title: 'Barbershop',
          metaTitle: 'Barbershop POS & Walk-In Queue Management Software | PriyuLabs',
          metaDescription: 'Walk-in queue management, chair turn times, quick mobile billing, and barber commission payouts tailored for modern barbershops.',
          h1: 'Barbershop Queue & Stylist Commission Software',
          shortDescription: 'Digital walk-in waitlist queue display, rapid counter checkout, barber split commission slips, and automated beard-trimming reminder campaigns.',
          problemsSolved: [
            {
              problem: 'Walk-In Customer Wait Time Frustration',
              solution: 'Digital waiting lobby TV screen displays live barber queue positions and estimated wait times.'
            },
            {
              problem: 'Barber Commission Calculations at End-of-Day',
              solution: 'Automatic split tracking based on haircut counts, beard grooming, and retail wax sales.'
            },
            {
              problem: 'Inconsistent Regular Customer Re-Visits',
              solution: 'Automated WhatsApp reminder sent precisely 21 days after previous haircut invites client for a trim.'
            },
            {
              problem: 'Loose Cash Counter Pilferage',
              solution: 'Soundbox verified UPI integration ensures cashiers punch every haircut into the system before releasing the seat.'
            }
          ],
          features: [
            {
              title: 'Digital Queue Waitlist TV',
              description: 'Display current customer queue on a lobby TV screen showing which barber is with which client.'
            },
            {
              title: '1-Click Barber Billing',
              description: 'Cashiers select the barber photo, tap the service icon (Haircut + Beard), and print receipt in 3 seconds.'
            },
            {
              title: 'Daily Cash & Commission Slips',
              description: 'Print individual barber payout slips at the end of each shift with complete transparency.'
            },
            {
              title: 'Automated 3-Week Haircut Alert',
              description: 'Send gentle automated WhatsApp reminders to male clients when their hair is due for a fresh fade.'
            },
            {
              title: 'Retail Grooming Product Upsell',
              description: 'Track beard oil, hair pomade, and wax sales with barber retail incentives.'
            },
            {
              title: 'Touchscreen Barber Check-In',
              description: 'Barbers tap their profile on the counter terminal to claim the next waiting walk-in customer.'
            }
          ],
          faqs: [
            {
              question: 'Can customers check their queue position on their own phones?',
              answer: 'Yes. When added to the waitlist, customers receive a WhatsApp text with a live tracking link.'
            },
            {
              question: 'Does the system support booth-rental or freelance barber models?',
              answer: 'Yes. You can configure revenue sharing, chair rental deductions, or standard commission percentages.'
            },
            {
              question: 'Can we print thermal receipts on 58mm compact printers?',
              answer: 'Yes. Both 58mm (2-inch) and 80mm (3-inch) thermal printers are fully supported.'
            },
            {
              question: 'Can barbers see their total tips at the end of the day?',
              answer: 'Yes. Digital tips added on card or UPI payments are clearly allocated to the barber on their settlement slip.'
            }
          ]
        },
        {
          slug: 'gym',
          url: '/gyms',
          title: 'Gym',
          metaTitle: 'Gym & Fitness Center Management Software | PriyuLabs',
          metaDescription: 'Biometric turnstile access integration, automated WhatsApp membership renewals, and PT trainer commission tracking for fitness clubs.',
          h1: 'Gym & Fitness Center Membership & Access Software',
          shortDescription: 'Biometric RFID/fingerprint turnstile integration, automatic WhatsApp membership renewal alerts, trainer PT logs, and supplement retail POS.',
          problemsSolved: [
            {
              problem: 'Defaulters Sneaking in Past Reception',
              solution: 'Direct biometric turnstile gate sync automatically locks access the moment a membership expires.'
            },
            {
              problem: 'Manual Payment Renewal Follow-Up Hassles',
              solution: 'Automated WhatsApp renewal reminders with instant UPI payment links sent 7 days and 2 days prior.'
            },
            {
              problem: 'Personal Trainer (PT) Session Disputes',
              solution: 'Digital session punch-in logs client and trainer attendance before every personal workout.'
            },
            {
              problem: 'Supplement & Protein Shake Inventory Theft',
              solution: 'Integrated retail barcode POS tracks whey protein tubs, pre-workout cans, and shaker bottles.'
            }
          ],
          features: [
            {
              title: 'Biometric Access Gate Sync',
              description: 'Connects directly with eSSL, ZKTeco, and Matrix biometric fingerprint/facial recognition turnstiles.'
            },
            {
              title: 'Automated WhatsApp Renewal Bot',
              description: 'Sends personalized renewal payment links with festive discount codes before plan expiry.'
            },
            {
              title: 'Personal Trainer Session Vault',
              description: 'Clients sign off on completed PT sessions digitally on trainer tablet or via mobile OTP.'
            },
            {
              title: 'Member Mobile Passbook',
              description: 'Members track active plan days, workout attendance history, and trainer schedule on mobile.'
            },
            {
              title: 'Supplement Bar Barcode POS',
              description: 'Barcode billing for whey protein, energy drinks, and gym merchandise with low-stock alerts.'
            },
            {
              title: 'Multi-Branch Access Pass',
              description: 'Allows premium members to work out at any branch across your fitness club network.'
            }
          ],
          faqs: [
            {
              question: 'Does PriyuLabs work with our existing fingerprint turnstile machine?',
              answer: 'Yes. We support standard biometric controllers (eSSL, ZKTeco, Realtime, Hikvision) via local network sync.'
            },
            {
              question: 'What happens when a member renews their plan online via WhatsApp?',
              answer: 'Their biometric access is instantly reactivated in the turnstile system within seconds of successful payment.'
            },
            {
              question: 'Can we track personal training commissions for trainers?',
              answer: 'Yes. Trainer payouts are automatically calculated per session completed or as a percentage of PT sales.'
            },
            {
              question: 'Can members freeze their memberships during medical emergencies?',
              answer: 'Yes. Authorized managers can pause membership days, which adjusts the expiration date automatically.'
            }
          ]
        }
      ]
    },
    {
      categorySlug: 'retail-shops',
      categoryTitle: 'Retail & Shops',
      description: 'High-speed barcode scanning, inventory replenishment, and customer credit ledgers for retail merchants.',
      sectors: [
        {
          slug: 'grocery',
          url: '/grocery-supermarkets-kirana',
          title: 'Grocery',
          metaTitle: 'Grocery & Supermarket POS Billing Software | PriyuLabs',
          metaDescription: 'High-speed barcode scanning, weighing scale sync, digital customer credit (Khata) ledger, and batch expiry management for supermarkets.',
          h1: 'Grocery, Kirana & Supermarket Barcode POS Software',
          shortDescription: 'High-speed multi-barcode checkout, weighing scale sync for loose grains and produce, digital Khata ledger with automated WhatsApp UPI payment links.',
          problemsSolved: [
            {
              problem: 'High Customer Billing Counter Rush Delays',
              solution: 'Rapid sub-second barcode laser scanner integration scans 30 items per minute effortlessly.'
            },
            {
              problem: 'Expired Cans and Packaged Goods on Shelves',
              solution: 'Automated 30-day early expiry shield flags expiring FMCG products for immediate supplier return or clearance.'
            },
            {
              problem: 'Uncollected Customer Credit (Udhar/Khata)',
              solution: 'Digital Khata ledger records credit balances and auto-dispatches WhatsApp reminder links with UPI.'
            },
            {
              problem: 'Weighing Fresh Vegetables and Grains Manually',
              solution: 'Direct serial scale integration captures live weight instantly without cashier keying.'
            }
          ],
          features: [
            {
              title: 'Pre-Loaded 50,000+ FMCG Barcode Database',
              description: 'Instant scan-and-bill for popular biscuits, soaps, pulses, and snacks without manual item entry.'
            },
            {
              title: 'Weighing Scale Direct Connect',
              description: 'Instant weight reading for loose rice, dal, onions, and potatoes with automatic price-per-kg math.'
            },
            {
              title: 'Digital Customer Udhar (Khata)',
              description: 'Maintain customer credit ledgers with daily purchase tracking and automated WhatsApp reminder links.'
            },
            {
              title: 'Expiry Shield & Batch Manager',
              description: 'Flag FMCG batches approaching expiry dates 30/60 days prior to prevent unsellable inventory loss.'
            },
            {
              title: 'Supplier Purchase Order & GRN',
              description: 'Generate purchase orders, verify supplier goods received against invoices, and track accounts payable.'
            },
            {
              title: 'Offline Queue Billing',
              description: 'Keep scanning and printing receipts even when your store broadband connection is completely down.'
            }
          ],
          faqs: [
            {
              question: 'Do I have to manually enter 5,000 grocery items before starting?',
              answer: 'No. PriyuLabs comes pre-configured with thousands of Indian FMCG product barcodes and standard packaging details.'
            },
            {
              question: 'Does it support loose grains and produce weighing scales?',
              answer: 'Yes. Standard digital weighing scales connect via USB or RS232 cable for instant weight capture.'
            },
            {
              question: 'How do customers pay their Khata credit balance?',
              answer: 'Customers receive an automated WhatsApp statement with a UPI link that settles their balance into your bank account.'
            },
            {
              question: 'Can I print small 2-inch and 3-inch barcode thermal bills?',
              answer: 'Yes. All standard receipt printers and barcode sticker label printers are supported.'
            }
          ]
        },
        {
          slug: 'clothing-store',
          url: '/apparel-boutiques',
          title: 'Clothing Store',
          metaTitle: 'Apparel Boutique & Clothing Store POS Software | PriyuLabs',
          metaDescription: 'Size-color variant matrix, custom clothing barcode tag printing, VIP customer lookbooks, and alteration tracking for fashion boutiques.',
          h1: 'Apparel Boutique & Fashion Retail Inventory POS',
          shortDescription: 'Multi-variant size-color grid, custom barcode clothing tag printing, alteration tracking, and seasonal dead-stock clearance reports for fashion retailers.',
          problemsSolved: [
            {
              problem: 'Managing Endless Size, Color & Fabric Variants',
              solution: 'Single parent SKU matrix manages XS to XXL and color variants in one streamlined view.'
            },
            {
              problem: 'Missing Barcodes on Designer Garments',
              solution: 'Print customized branded barcode tags with MRP, size, fabric care, and branding in 1 click.'
            },
            {
              problem: 'Dead Stock and Stale Fashion Inventory',
              solution: 'Dead-stock aging analytics highlight garments sitting on racks for 90+ days for seasonal sales.'
            },
            {
              problem: 'Garment Alteration Mix-ups',
              solution: 'Attach alteration job slips with tailor notes, master measurement details, and promised trial dates.'
            }
          ],
          features: [
            {
              title: 'Size & Color Variant Matrix',
              description: 'Manage complex garment variations (Size, Color, Fabric, Fit) under unified master catalog items.'
            },
            {
              title: '1-Tap Custom Barcode Tag Printing',
              description: 'Print thermal jewelry and clothing tags with store logo, wash care instructions, size, and MRP.'
            },
            {
              title: 'Garment Alteration Management',
              description: 'Assign alteration tickets to internal tailors with promised customer pickup dates and SMS alerts.'
            },
            {
              title: 'Dead Stock & Slow Movers Audit',
              description: 'Identify slow-moving collections to initiate targeted end-of-season clearance promotions.'
            },
            {
              title: 'VIP Digital WhatsApp Lookbook',
              description: 'Send high-resolution digital product lookbooks to VIP fashion buyers with direct buy links.'
            },
            {
              title: 'Credit Note & Exchange Management',
              description: 'Seamlessly issue customer store credit notes for returned garments with 90-day expiry enforcement.'
            }
          ],
          faqs: [
            {
              question: 'Can we print custom clothing hang-tags with our store logo?',
              answer: 'Yes. You can design and print custom thermal barcode sticker tags and jewelry rat-tail tags.'
            },
            {
              question: 'How does the system handle size and color exchanges?',
              answer: 'Cashiers can swap sizes in 1 click without voiding the bill, keeping inventory balances perfectly accurate.'
            },
            {
              question: 'Can we run Buy 2 Get 1 Free promotional offers?',
              answer: 'Yes. Advanced discount rules support mix-and-match offers, flat clearance discounts, and cart-level promos.'
            },
            {
              question: 'Does it support multi-outlet boutique stock transfers?',
              answer: 'Yes. Create transfer challans between branches and track stock in transit until confirmed by destination.'
            }
          ]
        },
        {
          slug: 'electronics',
          url: '/electronics-mobile-shops',
          title: 'Electronics',
          metaTitle: 'Electronics & Mobile Phone Shop POS Software | PriyuLabs',
          metaDescription: '15-digit IMEI serial number tracking, multi-bank zero-cost EMI billing, and digital WhatsApp warranty certificates for electronics stores.',
          h1: 'Electronics & Mobile Phone IMEI Warranty POS',
          shortDescription: 'Exact 15-digit IMEI/serial number tracking, multi-bank paperless EMI integration, digital warranty certificates, and trade-in exchange billing.',
          problemsSolved: [
            {
              problem: 'Fraudulent Phone Warranty Claims',
              solution: 'Every sales invoice records exact 15-digit IMEI/serial number pushed directly to customer WhatsApp.'
            },
            {
              problem: 'Complex Paperless Bank EMI Schemes',
              solution: 'Pre-configured credit/debit card EMI calculation with Bajaj Finserv, HDFC, and Pine Labs support.'
            },
            {
              problem: 'Used Phone Trade-In & Buyback Calculation',
              solution: 'Log trade-in old phone condition, calculate exchange discount, and capture legal customer ID proof.'
            },
            {
              problem: 'High-Value Serialized Stock Theft',
              solution: 'Real-time serial number audit matches physical back-room inventory against software stock instantly.'
            }
          ],
          features: [
            {
              title: 'IMEI & Serial Number Grabber',
              description: 'Scan 15-digit IMEI codes with 2D barcode scanner directly into invoice line items.'
            },
            {
              title: 'Paperless Multi-Bank EMI Calculation',
              description: 'Instant tenure calculation (3, 6, 9, 12 months) with processing fee and cashback breakdowns.'
            },
            {
              title: 'Digital Warranty Certificate',
              description: 'Automated branded WhatsApp warranty card sent to customer with brand warranty validity dates.'
            },
            {
              title: 'Trade-in & Old Device Buyback',
              description: 'Capture buyback device IMEI, battery health, aesthetic rating, and customer Aadhaar verification.'
            },
            {
              title: 'Brand Scheme & Volume Rebate Tracker',
              description: 'Track Samsung, Vivo, and Apple target achievement schemes and distributor incentive payouts.'
            },
            {
              title: 'Technician Repair Job-Sheet',
              description: 'Manage phone screen replacements, service status tracking, and spare part inventory.'
            }
          ],
          faqs: [
            {
              question: 'Does the bill clearly show the phone IMEI number for customer warranty claims?',
              answer: 'Yes. The invoice displays device model, color, storage, and 15-digit IMEI/serial numbers prominently.'
            },
            {
              question: 'Can we track individual commissions for sales promoters?',
              answer: 'Yes. Promoters can be tagged on specific invoices to calculate monthly brand commission payouts.'
            },
            {
              question: 'Does it support Bajaj Finserv and Pine Labs payment terminals?',
              answer: 'Yes. Payments sync directly to eliminate manual cashier keying errors on credit card terminals.'
            },
            {
              question: 'Can we audit serialized stock without stopping sales?',
              answer: 'Yes. Use wireless handheld barcode scanners to audit shelf stock in the background while counters operate.'
            }
          ]
        },
        {
          slug: 'pharmacy',
          url: '/healthcare/pharmacies',
          title: 'Pharmacy',
          metaTitle: 'Pharmacy & Chemist Shop Billing Software | PriyuLabs',
          metaDescription: 'Schedule H1 drug prescription tracking, batch expiry alerts, salt-composition substitute lookup, and GST-ready chemist billing.',
          h1: 'Pharmacy & Chemist Batch/Expiry Billing Software',
          shortDescription: 'Batch number and expiry tracking, salt and generic molecule substitution lookup, Schedule H/H1 narcotic registers, and GST pharmaceutical invoicing.',
          problemsSolved: [
            {
              problem: 'Unsold Expired Medicine Loss',
              solution: 'Automatic 60/90-day expiry notifications highlight medicines to be returned to pharmaceutical distributors.'
            },
            {
              problem: 'Out-of-Stock Branded Medicine Lost Sales',
              solution: 'Instant generic salt and molecule lookup suggests available chemical substitutes in real time.'
            },
            {
              problem: 'Strict Schedule H & H1 Drug Audit Penalties',
              solution: 'Mandatory prescription upload and doctor details capture for controlled antibiotic dispensations.'
            },
            {
              problem: 'Slow Distributor Purchase Bill Entry',
              solution: 'CSV and Excel purchase invoice import uploads 200+ medicine batches in under 30 seconds.'
            }
          ],
          features: [
            {
              title: 'Batch & Expiry Date Enforcement',
              description: 'Strict First-Expiry-First-Out (FEFO) dispensing ensures older non-expired batches sell first.'
            },
            {
              title: 'Generic Salt Composition Search',
              description: 'Search by Paracetamol 650mg, Amoxicillin, or Ibuprofen to find in-stock generic alternatives.'
            },
            {
              title: 'Schedule H & H1 Compliance Register',
              description: 'Auto-maintained digital register documenting patient name, prescribing doctor, and batch details.'
            },
            {
              title: 'Distributor Invoice CSV Import',
              description: 'Import distributor invoices directly to populate batch numbers, manufacturing dates, and purchase rates.'
            },
            {
              title: 'Strip & Tablet Cut Billing',
              description: 'Accurate pricing for individual loose tablets cut from a full 10-tablet or 15-tablet blister strip.'
            },
            {
              title: 'Chronic Patient Refill Reminders',
              description: 'Automated WhatsApp reminders sent every 28 days to diabetes and hypertension patients for medicine refills.'
            }
          ],
          faqs: [
            {
              question: 'Does the software support selling loose tablets cut from a strip?',
              answer: 'Yes. You define the tablets-per-strip ratio, and the system automatically calculates accurate fraction pricing.'
            },
            {
              question: 'Can we import distributor bills in Excel or CSV format?',
              answer: 'Yes. Upload pharmaceutical distributor invoices to automatically generate batches and purchase entries.'
            },
            {
              question: 'Does it generate Schedule H1 audit reports for drug inspectors?',
              answer: 'Yes. Generate compliant Schedule H and H1 dispensation registers with 1 click.'
            },
            {
              question: 'Can we alert chronic patients for monthly blood pressure and sugar medicines?',
              answer: 'Yes. The system automatically schedules WhatsApp refill alerts for regular long-term medication buyers.'
            }
          ]
        }
      ]
    },
    {
      categorySlug: 'education-services',
      categoryTitle: 'Education & Services',
      description: 'Streamlined batch fee collection, student attendance, and service ticketing for institutions and repair centers.',
      sectors: [
        {
          slug: 'coaching-institute',
          url: '/bookstores-stationery',
          title: 'Coaching Institute',
          metaTitle: 'Coaching Institute & Academy Management Software | PriyuLabs',
          metaDescription: 'Manage student admissions, batch scheduling, installment fee collection with WhatsApp payment links, and biometric attendance.',
          h1: 'Coaching Institute & Student Batch Fee Management',
          shortDescription: 'Student batch allocation, installment fee scheduling, automated WhatsApp fee due reminders with direct UPI links, and biometric attendance logs.',
          problemsSolved: [
            {
              problem: 'Chasing Late Tuition Fee Installments',
              solution: 'Automated WhatsApp payment reminder alerts sent to parents with direct 1-tap UPI fee payment links.'
            },
            {
              problem: 'Student Absenteeism Without Parent Awareness',
              solution: 'Biometric or RFID card punch triggers instant WhatsApp arrival/departure message to parents.'
            },
            {
              problem: 'Clashing Faculty & Classroom Timetables',
              solution: 'Central room and subject scheduling grid prevents faculty and classroom double-allocations.'
            },
            {
              problem: 'Unorganized Student Study Material Dispatch',
              solution: 'Track printed book and module distribution records per enrolled student ID.'
            }
          ],
          features: [
            {
              title: 'Installment Fee Plan Generator',
              description: 'Flexible fee schedules (Monthly, Quarterly, Lump Sum) with automated receipt and tax invoices.'
            },
            {
              title: 'Parent WhatsApp Fee Reminder Bot',
              description: 'Automated fee due notifications sent 5 days prior with secure UPI payment gateway integration.'
            },
            {
              title: 'Biometric RFID Student Attendance',
              description: 'Instant notification dispatched to parents when student punches in at coaching center reception.'
            },
            {
              title: 'Classroom & Faculty Timetable Grid',
              description: 'Visual schedule board allocating rooms, subject teachers, and test series timings.'
            },
            {
              title: 'Student Performance & Test Marks Portal',
              description: 'Record mock test scores and auto-send monthly progress report cards to parents.'
            },
            {
              title: 'Admission Lead CRM',
              description: 'Track walk-in inquiry forms, demo class attendance, and follow-up call statuses.'
            }
          ],
          faqs: [
            {
              question: 'Can parents pay student fees directly via UPI from WhatsApp?',
              answer: 'Yes. The reminder message contains a dynamic payment link that routes fee payments directly to your institute bank account.'
            },
            {
              question: 'Can we send SMS or WhatsApp alerts to parents when students are absent?',
              answer: 'Yes. Daily absence reports can auto-trigger alerts to parent mobile numbers within 15 minutes of class start.'
            },
            {
              question: 'Does the software manage multiple coaching branches?',
              answer: 'Yes. Central management allows administrators to monitor fee collections, enrollments, and staff attendance across all centers.'
            },
            {
              question: 'Can we print official GST fee receipts for parents?',
              answer: 'Yes. Clean branded receipts with serial invoice numbers and fee head breakdowns can be printed or sent as PDF.'
            }
          ]
        },
        {
          slug: 'tuition-centre',
          url: '/bookstores-stationery',
          title: 'Tuition Centre',
          metaTitle: 'Tuition Centre Attendance & Fee Tracking Software | PriyuLabs',
          metaDescription: 'Manage small student cohorts, monthly fee cards, parent notifications, and teacher payouts for local tuition and learning centres.',
          h1: 'Tuition Centre Attendance & Fee Tracking Software',
          shortDescription: 'Cohort management, quick monthly fee collection, QR attendance punch, and parent progress updates designed for neighbourhood tuition centres.',
          problemsSolved: [
            {
              problem: 'Cash Fee Accounting Discrepancies',
              solution: 'Instant digital fee receipt generated on mobile and shared immediately with parents on WhatsApp.'
            },
            {
              problem: 'Tracking Multiple Small Batches and Timings',
              solution: 'Easily organize Class 8 to 12 science and commerce cohorts with individual batch rosters.'
            },
            {
              problem: 'Manual Paper Attendance Registers',
              solution: 'QR code scanning or 1-tap mobile attendance roster logs student presence in seconds.'
            },
            {
              problem: 'Irregular Student Progress Feedback',
              solution: 'Share weekly homework completion and chapter test scores with parents in a standardized format.'
            }
          ],
          features: [
            {
              title: 'Cohort & Subject Batch Manager',
              description: 'Organize students by school grade, subject, and evening timing slots.'
            },
            {
              title: '1-Tap Mobile Fee Collection',
              description: 'Log monthly fees and generate professional PDF receipts in under 10 seconds.'
            },
            {
              title: 'QR Student Attendance Punch',
              description: 'Students scan their identity card QR on the reception tablet to mark attendance.'
            },
            {
              title: 'Weekly Test Score Card Dispatch',
              description: 'Send test scores and teacher feedback directly to parent WhatsApp chats.'
            },
            {
              title: 'Tutor Hourly & Batch Payouts',
              description: 'Track hourly faculty compensation and calculate monthly teacher remuneration accurately.'
            },
            {
              title: 'Study Notes & Worksheet Vault',
              description: 'Keep record of distributed mock question papers and chapter practice booklets.'
            }
          ],
          faqs: [
            {
              question: 'Is this suitable for a single-room or 2-room neighbourhood tuition centre?',
              answer: 'Yes. PriyuLabs is designed to be affordable, ultra-fast, and simple to operate from any mobile phone or tablet.'
            },
            {
              question: 'Can we track monthly fee defaulters easily?',
              answer: 'Yes. A single dashboard screen lists all students with pending fees, with a 1-click button to send WhatsApp reminders.'
            },
            {
              question: 'Can teachers mark attendance from their own smartphones?',
              answer: 'Yes. Staff logins allow teachers to take roll calls directly from their phone browser.'
            },
            {
              question: 'How do parents receive the fee receipts?',
              answer: 'Receipts are automatically delivered as a formatted WhatsApp message with an optional downloadable PDF invoice.'
            }
          ]
        },
        {
          slug: 'clinic',
          url: '/healthcare/pharmacies',
          title: 'Clinic',
          metaTitle: 'Clinic & Doctor Appointment Patient Billing Software | PriyuLabs',
          metaDescription: 'OPD queue tokens, doctor appointment scheduling, prescription printing, and patient fee billing for medical clinics and polyclinics.',
          h1: 'Clinic & Doctor Appointment Patient Billing Software',
          shortDescription: 'Digital OPD queue tokens, doctor consultation scheduling, patient medical history vault, prescription printing, and pharmacy integration.',
          problemsSolved: [
            {
              problem: 'Chaotic Reception OPD Waiting Lobby Crowds',
              solution: 'Digital OPD token system displays estimated consultation wait times on reception waiting room screens.'
            },
            {
              problem: 'Lost Patient Medical Records',
              solution: 'Secure digital patient timeline archives past vitals, consultation notes, and prescription history.'
            },
            {
              problem: 'Polyclinic Multi-Doctor Fee Splits',
              solution: 'Automated consultation fee accounting tracks doctor shares and clinic facility charges transparently.'
            },
            {
              problem: 'Unverified Patient Follow-Up Visits',
              solution: 'Automated WhatsApp follow-up reminders notify patients when their recommended check-up is due.'
            }
          ],
          features: [
            {
              title: 'Digital OPD Token Generator',
              description: 'Issue sequential OPD consultation tokens with estimated wait time and SMS notifications.'
            },
            {
              title: 'Doctor Schedule & Slot Manager',
              description: 'Manage morning and evening visiting hours across multiple specialist doctors.'
            },
            {
              title: 'Digital Prescription Pad',
              description: 'Type or choose from saved medicine templates to print clean, legible prescriptions.'
            },
            {
              title: 'Doctor Fee Split Accounting',
              description: 'Daily settlement reports dividing gross consultation revenue between clinic and doctors.'
            },
            {
              title: 'In-House Pharmacy & Lab Sync',
              description: 'Push doctor prescriptions directly to clinic pharmacy counter to reduce patient wait times.'
            },
            {
              title: 'WhatsApp Appointment Booking',
              description: 'Patients can book, reschedule, or verify clinic consultation slots directly over WhatsApp.'
            }
          ],
          faqs: [
            {
              question: 'Can doctors view patient consultation history on their own tablets?',
              answer: 'Yes. Doctors have private access to view previous vitals, diagnosis notes, and past prescribed medications.'
            },
            {
              question: 'Does the system print branded clinic letterheads for prescriptions?',
              answer: 'Yes. You can print prescriptions on standard A4/A5 paper with clinic logo, doctor registration numbers, and signatures.'
            },
            {
              question: 'Can we manage multiple visiting doctors with different commission rates?',
              answer: 'Yes. Each doctor profile can have custom consultation fees and revenue-sharing percentages.'
            },
            {
              question: 'Is patient medical data stored securely?',
              answer: 'Yes. Patient data is encrypted with strict bank-grade SSL security and access controls.'
            }
          ]
        },
        {
          slug: 'repair-shop',
          url: '/electronics-mobile-shops',
          title: 'Repair Shop',
          metaTitle: 'Repair Shop & Service Center Job-Sheet Software | PriyuLabs',
          metaDescription: 'Manage device intake inspection photos, technician job-sheets, spare part inventory, and WhatsApp repair status updates.',
          h1: 'Device & Appliance Repair Job-Sheet Tracking Software',
          shortDescription: 'Digital repair job-sheets, intake condition photos, technician assignment, spare parts inventory deduction, and WhatsApp repair status alerts.',
          problemsSolved: [
            {
              problem: 'Customer Disputes Over Pre-Existing Scratches',
              solution: 'Capture intake inspection photos and customer sign-off on screen before accepting devices for repair.'
            },
            {
              problem: 'Constant "Is My Device Ready?" Phone Inquiries',
              solution: 'Automatic WhatsApp alerts notify customers when device is "Diagnosed", "In Repair", and "Ready for Pickup".'
            },
            {
              problem: 'Spare Parts Pilferage & Inventory Leakage',
              solution: 'Technicians must log specific screens, batteries, or IC components consumed against the job-sheet number.'
            },
            {
              problem: 'Uncollected Repaired Devices Sitting in Storage',
              solution: 'Automated periodic reminders prompt customers to collect repaired items and settle outstanding balances.'
            }
          ],
          features: [
            {
              title: 'Digital Intake Job-Sheet',
              description: 'Record device serial number, passcode, reported fault, accessories received, and estimated cost.'
            },
            {
              title: 'Intake Defect Camera Log',
              description: 'Attach photos of pre-existing screen cracks, scratches, and water damage directly to the job ticket.'
            },
            {
              title: 'Automated WhatsApp Status Tracker',
              description: 'Live tracking link allows customers to check repair progress without needing to call the shop.'
            },
            {
              title: 'Spare Part Inventory Sync',
              description: 'Deduct screens, charging ports, and replacement motherboards from stock upon job completion.'
            },
            {
              title: 'Technician Labor Incentive Tracker',
              description: 'Monitor individual technician repair volume and calculate monthly skill-based commission.'
            },
            {
              title: 'Post-Repair Warranty Slips',
              description: 'Print 30/90-day repair warranty cards with clear conditions and terms of service.'
            }
          ],
          faqs: [
            {
              question: 'Can customers check repair status on their phone without calling?',
              answer: 'Yes. Each job-sheet generates a private tracking URL sent via WhatsApp with real-time status updates.'
            },
            {
              question: 'Can we photograph existing damage when accepting a laptop or smartphone?',
              answer: 'Yes. Cashiers can snap intake photos with the POS tablet camera and attach them to the digital job-sheet.'
            },
            {
              question: 'Does the software deduct replacement parts from our stock automatically?',
              answer: 'Yes. When a technician marks an item as repaired, the used spare parts are immediately deducted from inventory.'
            },
            {
              question: 'Can we print thermal adhesive stickers for repaired device boxes?',
              answer: 'Yes. Print job ticket barcode stickers to label incoming gadgets and packaging boxes.'
            }
          ]
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

