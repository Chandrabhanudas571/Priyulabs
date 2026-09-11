import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '../components/SiteLayout';
import {
  CafesChaiBarsPage,
  CloudKitchensCateringPage,
  BakeriesSweetShopsPage,
  BarsPubsBreweriesPage,
  GrocerySupermarketsKiranaPage,
  ElectronicsMobileShopsPage,
  FootwearLeatherStoresPage,
  JewelleryShopsPage,
  WatchStoresPage,
  BookstoresStationeryPage,
  HomePage,
  HospitalityPage,
  PosPage,
  QsrFastFoodPage,
  RestaurantsFineDiningPage,
  SolutionsPage,
} from '../features/marketing/pages';
import { NotFoundPage } from '../features/marketing/NotFoundPage';

export function App() {
  return (
    <SiteLayout>
      <Routes>
        {/* Core Application Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/hospitality" element={<HospitalityPage />} />
        <Route path="/food-beverage/restaurants-fine-dining" element={<RestaurantsFineDiningPage />} />
        <Route path="/restaurants-fine-dining" element={<RestaurantsFineDiningPage />} />
        <Route path="/food-beverage/qsr-fast-food" element={<QsrFastFoodPage />} />
        <Route path="/qsr-fast-food" element={<QsrFastFoodPage />} />
        <Route path="/food-beverage/cafes-chai-bars" element={<CafesChaiBarsPage />} />
        <Route path="/cafes-chai-bars" element={<CafesChaiBarsPage />} />
        <Route path="/food-beverage/cloud-kitchens-catering" element={<CloudKitchensCateringPage />} />
        <Route path="/cloud-kitchens-catering" element={<CloudKitchensCateringPage />} />
        <Route path="/food-beverage/bakeries-sweet-shops" element={<BakeriesSweetShopsPage />} />
        <Route path="/bakeries-sweet-shops" element={<BakeriesSweetShopsPage />} />
        <Route path="/food-beverage/bakeries-shops" element={<BakeriesSweetShopsPage />} />
        <Route path="/bakeries-shops" element={<BakeriesSweetShopsPage />} />
        <Route path="/food-beverage/bars-pubs-breweries" element={<BarsPubsBreweriesPage />} />
        <Route path="/bars-pubs-breweries" element={<BarsPubsBreweriesPage />} />
        <Route path="/retail/grocery-supermarkets-kirana" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/grocery-supermarkets-kirana" element={<GrocerySupermarketsKiranaPage />} />
        <Route path="/retail/electronics-mobile-shops" element={<ElectronicsMobileShopsPage />} />
        <Route path="/electronics-mobile-shops" element={<ElectronicsMobileShopsPage />} />
        <Route path="/retail/footwear-leather-stores" element={<FootwearLeatherStoresPage />} />
        <Route path="/footwear-leather-stores" element={<FootwearLeatherStoresPage />} />
        <Route path="/retail/jewellery-shops" element={<JewelleryShopsPage />} />
        <Route path="/jewellery-shops" element={<JewelleryShopsPage />} />
        <Route path="/retail/watch-stores" element={<WatchStoresPage />} />
        <Route path="/watch-stores" element={<WatchStoresPage />} />
        <Route path="/retail/bookstores-stationery" element={<BookstoresStationeryPage />} />
        <Route path="/bookstores-stationery" element={<BookstoresStationeryPage />} />

        {/* Backwards-compatible legacy .html redirects */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/solutions.html" element={<Navigate to="/solutions" replace />} />
        <Route path="/pos.html" element={<Navigate to="/pos" replace />} />
        <Route path="/hospitality.html" element={<Navigate to="/hospitality" replace />} />
        <Route path="/restaurants-fine-dining.html" element={<Navigate to="/food-beverage/restaurants-fine-dining" replace />} />
        <Route path="/qsr-fast-food.html" element={<Navigate to="/food-beverage/qsr-fast-food" replace />} />
        <Route path="/cafes-chai-bars.html" element={<Navigate to="/food-beverage/cafes-chai-bars" replace />} />
        <Route path="/cloud-kitchens-catering.html" element={<Navigate to="/food-beverage/cloud-kitchens-catering" replace />} />
        <Route path="/bakeries-sweet-shops.html" element={<Navigate to="/food-beverage/bakeries-shops" replace />} />
        <Route path="/bakeries-shops.html" element={<Navigate to="/food-beverage/bakeries-shops" replace />} />
        <Route path="/bars-pubs-breweries.html" element={<Navigate to="/food-beverage/bars-pubs-breweries" replace />} />
        <Route path="/grocery-supermarkets-kirana.html" element={<Navigate to="/retail/grocery-supermarkets-kirana" replace />} />
        <Route path="/electronics-mobile-shops.html" element={<Navigate to="/retail/electronics-mobile-shops" replace />} />
        <Route path="/footwear-leather-stores.html" element={<Navigate to="/retail/footwear-leather-stores" replace />} />
        <Route path="/jewellery-shops.html" element={<Navigate to="/retail/jewellery-shops" replace />} />
        <Route path="/watch-stores.html" element={<Navigate to="/retail/watch-stores" replace />} />
        <Route path="/bookstores-stationery.html" element={<Navigate to="/retail/bookstores-stationery" replace />} />

        {/* Fallback 404 handler to prevent blank page on unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
