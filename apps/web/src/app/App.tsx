import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '../components/SiteLayout';
import {
  ApparelBoutiquesPage,
  BakeriesSweetShopsPage,
  BarsPubsBreweriesPage,
  BookstoresStationeryPage,
  CafesChaiBarsPage,
  CloudKitchensCateringPage,
  CosmeticsSkincarePage,
  DryCleanersLaundryPage,
  ElectronicsMobileShopsPage,
  FitnessGymsPage,
  FootwearLeatherStoresPage,
  GrocerySupermarketsKiranaPage,
  HomePage,
  HospitalityPage,
  JewelleryShopsPage,
  PosPage,
  QsrFastFoodPage,
  RestaurantsFineDiningPage,
  SalonsSpasPage,
  SolutionsPage,
  WatchStoresPage,
} from '../features/marketing/pages';
import { NotFoundPage } from '../features/marketing/NotFoundPage';
import { PriyuLabsPreloader } from '../components/PriyuLabsPreloader';

export function App() {
  return (
    <>
      <PriyuLabsPreloader />
      <SiteLayout>
        <Routes>
        {/* Core Application Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/hospitality" element={<HospitalityPage />} />

        {/* Food & Beverage */}
        <Route path="/food-beverage/restaurants-fine-dining" element={<RestaurantsFineDiningPage />} />
        <Route path="/food-beverage/restaurants" element={<RestaurantsFineDiningPage />} />
        <Route path="/food-beverage/fine-dine" element={<RestaurantsFineDiningPage />} />
        <Route path="/food-beverage/fine-dine/index.html" element={<RestaurantsFineDiningPage />} />
        <Route path="/food-beverage/fine-dine.html" element={<Navigate to="/food-beverage/fine-dine" replace />} />
        <Route path="/restaurants" element={<RestaurantsFineDiningPage />} />
        <Route path="/restaurants.html" element={<Navigate to="/food-beverage/restaurants" replace />} />
        <Route path="/restaurants-fine-dining" element={<RestaurantsFineDiningPage />} />
        <Route path="/restaurants-fine-dining.html" element={<Navigate to="/food-beverage/restaurants-fine-dining" replace />} />
        
        <Route path="/food-beverage/qsr-fast-food" element={<QsrFastFoodPage />} />
        <Route path="/food-beverage/qsr" element={<QsrFastFoodPage />} />
        <Route path="/food-beverage/food-trucks" element={<QsrFastFoodPage />} />
        <Route path="/food-beverage/food-trucks/index.html" element={<QsrFastFoodPage />} />
        <Route path="/food-beverage/food-trucks.html" element={<Navigate to="/food-beverage/food-trucks" replace />} />
        <Route path="/qsr" element={<QsrFastFoodPage />} />
        <Route path="/qsr.html" element={<Navigate to="/food-beverage/qsr" replace />} />
        <Route path="/qsr-fast-food" element={<QsrFastFoodPage />} />
        <Route path="/qsr-fast-food.html" element={<Navigate to="/food-beverage/qsr-fast-food" replace />} />
        
        <Route path="/food-beverage/cafes-chai-bars" element={<CafesChaiBarsPage />} />
        <Route path="/cafes-chai-bars" element={<CafesChaiBarsPage />} />
        <Route path="/cafes-chai-bars.html" element={<Navigate to="/food-beverage/cafes-chai-bars" replace />} />
        <Route path="/food-beverage/cafes" element={<CafesChaiBarsPage />} />
        <Route path="/food-beverage/cafes/index.html" element={<CafesChaiBarsPage />} />
        <Route path="/cafes" element={<CafesChaiBarsPage />} />
        <Route path="/cafes.html" element={<Navigate to="/food-beverage/cafes" replace />} />
        <Route path="/cafes/index.html" element={<CafesChaiBarsPage />} />
        
        <Route path="/food-beverage/cloud-kitchens-catering" element={<CloudKitchensCateringPage />} />
        <Route path="/cloud-kitchens-catering" element={<CloudKitchensCateringPage />} />
        <Route path="/cloud-kitchens-catering.html" element={<Navigate to="/food-beverage/cloud-kitchens-catering" replace />} />
        <Route path="/food-beverage/cloud-kitchens" element={<CloudKitchensCateringPage />} />
        <Route path="/food-beverage/cloud-kitchens/index.html" element={<CloudKitchensCateringPage />} />
        <Route path="/cloud-kitchens" element={<CloudKitchensCateringPage />} />
        <Route path="/cloud-kitchens.html" element={<Navigate to="/food-beverage/cloud-kitchens" replace />} />
        <Route path="/cloud-kitchens/index.html" element={<CloudKitchensCateringPage />} />
        
        <Route path="/food-beverage/bakeries-sweet-shops" element={<BakeriesSweetShopsPage />} />
        <Route path="/bakeries-sweet-shops" element={<BakeriesSweetShopsPage />} />
        <Route path="/food-beverage/bakeries-shops" element={<BakeriesSweetShopsPage />} />
        <Route path="/bakeries-shops" element={<BakeriesSweetShopsPage />} />
        <Route path="/food-beverage/bakeries-patisseries" element={<BakeriesSweetShopsPage />} />
        <Route path="/bakeries-sweet-shops.html" element={<Navigate to="/food-beverage/bakeries-shops" replace />} />
        <Route path="/bakeries-shops.html" element={<Navigate to="/food-beverage/bakeries-shops" replace />} />
        <Route path="/food-beverage/bakeries" element={<BakeriesSweetShopsPage />} />
        <Route path="/food-beverage/bakeries/index.html" element={<BakeriesSweetShopsPage />} />
        <Route path="/bakeries" element={<BakeriesSweetShopsPage />} />
        <Route path="/bakeries.html" element={<Navigate to="/food-beverage/bakeries" replace />} />
        <Route path="/bakeries/index.html" element={<BakeriesSweetShopsPage />} />
        
        <Route path="/food-beverage/bars-pubs-breweries" element={<BarsPubsBreweriesPage />} />
        <Route path="/bars-pubs-breweries" element={<BarsPubsBreweriesPage />} />
        <Route path="/bars-pubs-breweries.html" element={<Navigate to="/food-beverage/bars-pubs-breweries" replace />} />
        <Route path="/food-beverage/bars-pubs" element={<BarsPubsBreweriesPage />} />
        <Route path="/food-beverage/bars-pubs/index.html" element={<BarsPubsBreweriesPage />} />
        <Route path="/bars-pubs" element={<BarsPubsBreweriesPage />} />
        <Route path="/bars-pubs.html" element={<Navigate to="/food-beverage/bars-pubs" replace />} />
        <Route path="/bars-pubs/index.html" element={<BarsPubsBreweriesPage />} />

        {/* Retail */}
        <Route path="/retail/grocery-supermarkets-kirana" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/retail/grocery-supermarkets-kirana/index.html" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/grocery-supermarkets-kirana" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/grocery-supermarkets-kirana.html" element={<Navigate to="/retail/grocery-supermarkets-kirana" replace />} />
        <Route path="/retail/grocery" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/retail/grocery/index.html" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/retail/grocery.html" element={<Navigate to="/retail/grocery" replace />} />
        <Route path="/grocery" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/grocery.html" element={<Navigate to="/retail/grocery" replace />} />
        <Route path="/grocery/index.html" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/retail/supermarkets" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/retail/supermarkets/index.html" element={<GrocerySupermarketsKiranaPage />} />
        
        <Route path="/retail/electronics-mobile-shops" element={<ElectronicsMobileShopsPage />} />
        <Route path="/retail/electronics-mobile-shops/index.html" element={<ElectronicsMobileShopsPage />} />
        <Route path="/electronics-mobile-shops" element={<ElectronicsMobileShopsPage />} />
        <Route path="/electronics-mobile-shops.html" element={<Navigate to="/retail/electronics-mobile-shops" replace />} />
        <Route path="/retail/electronics" element={<ElectronicsMobileShopsPage />} />
        <Route path="/retail/electronics/index.html" element={<ElectronicsMobileShopsPage />} />
        <Route path="/retail/electronics.html" element={<Navigate to="/retail/electronics" replace />} />
        <Route path="/electronics" element={<ElectronicsMobileShopsPage />} />
        <Route path="/electronics.html" element={<Navigate to="/retail/electronics" replace />} />
        <Route path="/electronics/index.html" element={<ElectronicsMobileShopsPage />} />
        <Route path="/retail/mobile-shops" element={<ElectronicsMobileShopsPage />} />
        <Route path="/retail/mobile-shops/index.html" element={<ElectronicsMobileShopsPage />} />
        
        <Route path="/retail/footwear-leather-stores" element={<FootwearLeatherStoresPage />} />
        <Route path="/retail/footwear-leather-stores/index.html" element={<FootwearLeatherStoresPage />} />
        <Route path="/footwear-leather-stores" element={<FootwearLeatherStoresPage />} />
        <Route path="/footwear-leather-stores.html" element={<Navigate to="/retail/footwear-leather-stores" replace />} />
        <Route path="/retail/footwear" element={<FootwearLeatherStoresPage />} />
        <Route path="/retail/footwear/index.html" element={<FootwearLeatherStoresPage />} />
        <Route path="/retail/footwear.html" element={<Navigate to="/retail/footwear" replace />} />
        <Route path="/footwear" element={<FootwearLeatherStoresPage />} />
        <Route path="/footwear.html" element={<Navigate to="/retail/footwear" replace />} />
        <Route path="/footwear/index.html" element={<FootwearLeatherStoresPage />} />
        <Route path="/retail/leather" element={<FootwearLeatherStoresPage />} />
        <Route path="/retail/leather/index.html" element={<FootwearLeatherStoresPage />} />
        
        <Route path="/retail/jewellery-shops" element={<JewelleryShopsPage />} />
        <Route path="/retail/jewellery-shops/index.html" element={<JewelleryShopsPage />} />
        <Route path="/jewellery-shops" element={<JewelleryShopsPage />} />
        <Route path="/jewellery-shops.html" element={<Navigate to="/retail/jewellery-shops" replace />} />
        <Route path="/jewellery-shops/index.html" element={<JewelleryShopsPage />} />
        <Route path="/retail/jewellery" element={<JewelleryShopsPage />} />
        <Route path="/retail/jewellery/index.html" element={<JewelleryShopsPage />} />
        <Route path="/retail/jewellery.html" element={<Navigate to="/retail/jewellery" replace />} />
        <Route path="/jewellery" element={<JewelleryShopsPage />} />
        <Route path="/jewellery.html" element={<Navigate to="/retail/jewellery" replace />} />
        <Route path="/jewellery/index.html" element={<JewelleryShopsPage />} />
        <Route path="/retail/jewelry" element={<JewelleryShopsPage />} />
        <Route path="/retail/jewelry/index.html" element={<JewelleryShopsPage />} />
        <Route path="/retail/jewelry.html" element={<Navigate to="/retail/jewellery" replace />} />
        
        <Route path="/retail/watch-stores" element={<WatchStoresPage />} />
        <Route path="/retail/watch-stores/index.html" element={<WatchStoresPage />} />
        <Route path="/watch-stores" element={<WatchStoresPage />} />
        <Route path="/watch-stores.html" element={<Navigate to="/retail/watch-stores" replace />} />
        <Route path="/watch-stores/index.html" element={<WatchStoresPage />} />
        <Route path="/retail/watches" element={<WatchStoresPage />} />
        <Route path="/retail/watches/index.html" element={<WatchStoresPage />} />
        <Route path="/retail/watches.html" element={<Navigate to="/retail/watches" replace />} />
        <Route path="/watches" element={<WatchStoresPage />} />
        <Route path="/watches.html" element={<Navigate to="/retail/watches" replace />} />
        <Route path="/watches/index.html" element={<WatchStoresPage />} />
        
        {/* Bookstores & Stationery */}
        <Route path="/retail/bookstores-stationery" element={<BookstoresStationeryPage />} />
        <Route path="/retail/bookstores-stationery/index.html" element={<BookstoresStationeryPage />} />
        <Route path="/retail/bookstores-stationery.html" element={<Navigate to="/retail/bookstores-stationery" replace />} />
        <Route path="/bookstores-stationery" element={<BookstoresStationeryPage />} />
        <Route path="/bookstores-stationery/index.html" element={<BookstoresStationeryPage />} />
        <Route path="/bookstores-stationery.html" element={<Navigate to="/retail/bookstores-stationery" replace />} />
        <Route path="/retail/bookstores" element={<BookstoresStationeryPage />} />
        <Route path="/retail/bookstores/index.html" element={<BookstoresStationeryPage />} />
        <Route path="/retail/bookstores.html" element={<Navigate to="/retail/bookstores-stationery" replace />} />
        <Route path="/bookstores" element={<BookstoresStationeryPage />} />
        <Route path="/bookstores/index.html" element={<BookstoresStationeryPage />} />
        <Route path="/bookstores.html" element={<Navigate to="/retail/bookstores-stationery" replace />} />
        <Route path="/retail/bookstore" element={<BookstoresStationeryPage />} />
        <Route path="/retail/bookstore/index.html" element={<BookstoresStationeryPage />} />
        <Route path="/retail/bookstore.html" element={<Navigate to="/retail/bookstores-stationery" replace />} />
        <Route path="/bookstore" element={<BookstoresStationeryPage />} />
        <Route path="/bookstore/index.html" element={<BookstoresStationeryPage />} />
        <Route path="/bookstore.html" element={<Navigate to="/retail/bookstores-stationery" replace />} />

        {/* Fashion & Beauty */}
        {/* 1. Apparel & Boutiques */}
        <Route path="/fashion-beauty/apparel-boutiques" element={<ApparelBoutiquesPage />} />
        <Route path="/fashion-beauty/apparel-boutiques/index.html" element={<ApparelBoutiquesPage />} />
        <Route path="/fashion-beauty/apparel-boutiques.html" element={<Navigate to="/fashion-beauty/apparel-boutiques" replace />} />
        <Route path="/apparel-boutiques" element={<ApparelBoutiquesPage />} />
        <Route path="/apparel-boutiques/index.html" element={<ApparelBoutiquesPage />} />
        <Route path="/apparel-boutiques.html" element={<Navigate to="/fashion-beauty/apparel-boutiques" replace />} />
        <Route path="/fashion-beauty/apparel" element={<ApparelBoutiquesPage />} />
        <Route path="/fashion-beauty/apparel/index.html" element={<ApparelBoutiquesPage />} />
        <Route path="/fashion-beauty/apparel.html" element={<Navigate to="/fashion-beauty/apparel-boutiques" replace />} />
        <Route path="/beauty-fashion/apparel" element={<ApparelBoutiquesPage />} />
        <Route path="/beauty-fashion/apparel/index.html" element={<ApparelBoutiquesPage />} />
        <Route path="/beauty-fashion/apparel.html" element={<Navigate to="/fashion-beauty/apparel-boutiques" replace />} />
        <Route path="/apparel" element={<ApparelBoutiquesPage />} />
        <Route path="/apparel/index.html" element={<ApparelBoutiquesPage />} />
        <Route path="/apparel.html" element={<Navigate to="/fashion-beauty/apparel-boutiques" replace />} />
        <Route path="/beauty-fashion/clothing" element={<ApparelBoutiquesPage />} />
        <Route path="/beauty-fashion/clothing/index.html" element={<ApparelBoutiquesPage />} />
        <Route path="/beauty-fashion/clothing.html" element={<Navigate to="/fashion-beauty/apparel-boutiques" replace />} />
        <Route path="/clothing" element={<ApparelBoutiquesPage />} />
        <Route path="/clothing-brands" element={<ApparelBoutiquesPage />} />
        <Route path="/clothing-brands.html" element={<Navigate to="/fashion-beauty/apparel-boutiques" replace />} />
        
        {/* 2. Salons & Spas */}
        <Route path="/fashion-beauty/salons-spas" element={<SalonsSpasPage />} />
        <Route path="/fashion-beauty/salons-spas/index.html" element={<SalonsSpasPage />} />
        <Route path="/fashion-beauty/salons-spas.html" element={<Navigate to="/fashion-beauty/salons-spas" replace />} />
        <Route path="/salons-spas" element={<SalonsSpasPage />} />
        <Route path="/salons-spas/index.html" element={<SalonsSpasPage />} />
        <Route path="/salons-spas.html" element={<Navigate to="/fashion-beauty/salons-spas" replace />} />
        <Route path="/fashion-beauty/salons" element={<SalonsSpasPage />} />
        <Route path="/fashion-beauty/salons/index.html" element={<SalonsSpasPage />} />
        <Route path="/fashion-beauty/salons.html" element={<Navigate to="/fashion-beauty/salons-spas" replace />} />
        <Route path="/beauty-fashion/salons" element={<SalonsSpasPage />} />
        <Route path="/beauty-fashion/salons/index.html" element={<SalonsSpasPage />} />
        <Route path="/beauty-fashion/salons.html" element={<Navigate to="/fashion-beauty/salons-spas" replace />} />
        <Route path="/salons" element={<SalonsSpasPage />} />
        <Route path="/salons/index.html" element={<SalonsSpasPage />} />
        <Route path="/salons.html" element={<Navigate to="/fashion-beauty/salons-spas" replace />} />
        <Route path="/spas" element={<SalonsSpasPage />} />
        <Route path="/spas/index.html" element={<SalonsSpasPage />} />
        <Route path="/spas.html" element={<Navigate to="/fashion-beauty/salons-spas" replace />} />
        
        {/* 3. Cosmetics & Skincare */}
        <Route path="/fashion-beauty/cosmetics-skincare" element={<CosmeticsSkincarePage />} />
        <Route path="/fashion-beauty/cosmetics-skincare/index.html" element={<CosmeticsSkincarePage />} />
        <Route path="/fashion-beauty/cosmetics-skincare.html" element={<Navigate to="/fashion-beauty/cosmetics-skincare" replace />} />
        <Route path="/cosmetics-skincare" element={<CosmeticsSkincarePage />} />
        <Route path="/cosmetics-skincare/index.html" element={<CosmeticsSkincarePage />} />
        <Route path="/cosmetics-skincare.html" element={<Navigate to="/fashion-beauty/cosmetics-skincare" replace />} />
        <Route path="/fashion-beauty/cosmetics" element={<CosmeticsSkincarePage />} />
        <Route path="/fashion-beauty/cosmetics/index.html" element={<CosmeticsSkincarePage />} />
        <Route path="/fashion-beauty/cosmetics.html" element={<Navigate to="/fashion-beauty/cosmetics-skincare" replace />} />
        <Route path="/beauty-fashion/cosmetics" element={<CosmeticsSkincarePage />} />
        <Route path="/beauty-fashion/cosmetics/index.html" element={<CosmeticsSkincarePage />} />
        <Route path="/beauty-fashion/cosmetics.html" element={<Navigate to="/fashion-beauty/cosmetics-skincare" replace />} />
        <Route path="/cosmetics" element={<CosmeticsSkincarePage />} />
        <Route path="/cosmetics/index.html" element={<CosmeticsSkincarePage />} />
        <Route path="/cosmetics.html" element={<Navigate to="/fashion-beauty/cosmetics-skincare" replace />} />

        {/* Services & Wellness */}
        {/* 1. Gyms & Fitness */}
        <Route path="/services/gyms" element={<FitnessGymsPage />} />
        <Route path="/services/gyms/index.html" element={<FitnessGymsPage />} />
        <Route path="/services/gyms.html" element={<Navigate to="/services/gyms" replace />} />
        <Route path="/gyms" element={<FitnessGymsPage />} />
        <Route path="/gyms/index.html" element={<FitnessGymsPage />} />
        <Route path="/gyms.html" element={<Navigate to="/services/gyms" replace />} />
        <Route path="/wellness/gyms" element={<FitnessGymsPage />} />
        <Route path="/wellness/gyms/index.html" element={<FitnessGymsPage />} />
        <Route path="/wellness/gyms.html" element={<Navigate to="/services/gyms" replace />} />
        <Route path="/fitness-gyms" element={<FitnessGymsPage />} />
        <Route path="/fitness-gyms/index.html" element={<FitnessGymsPage />} />
        <Route path="/fitness-gyms.html" element={<Navigate to="/services/gyms" replace />} />

        {/* 2. Dry Cleaners & Laundry */}
        <Route path="/services/dry-cleaners" element={<DryCleanersLaundryPage />} />
        <Route path="/services/dry-cleaners/index.html" element={<DryCleanersLaundryPage />} />
        <Route path="/services/dry-cleaners.html" element={<Navigate to="/services/dry-cleaners" replace />} />
        <Route path="/services/laundry" element={<DryCleanersLaundryPage />} />
        <Route path="/services/laundry/index.html" element={<DryCleanersLaundryPage />} />
        <Route path="/services/laundry.html" element={<Navigate to="/services/dry-cleaners" replace />} />
        <Route path="/dry-cleaners" element={<DryCleanersLaundryPage />} />
        <Route path="/dry-cleaners/index.html" element={<DryCleanersLaundryPage />} />
        <Route path="/dry-cleaners.html" element={<Navigate to="/services/dry-cleaners" replace />} />
        <Route path="/laundry" element={<DryCleanersLaundryPage />} />
        <Route path="/laundry/index.html" element={<DryCleanersLaundryPage />} />
        <Route path="/laundry.html" element={<Navigate to="/services/dry-cleaners" replace />} />

        {/* Fallback 404 handler to prevent blank page on unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
    </>
  );
}
