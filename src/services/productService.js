import { getCategories, getProducts, getProduct } from "../api/productApi.js";
import { appActions } from "../store/index.js";
import { getQueryParams } from "../utils/queryParams.js";

// 카테고리 캐시
let categoriesCache = {};

// 홈페이지 데이터 로드
export const loadHomePageData = async (currentRequestId, getRequestId) => {
  const requestId = currentRequestId;
  const params = getQueryParams();

  appActions.startLoading();

  try {
    if (Object.keys(categoriesCache).length === 0) {
      categoriesCache = await getCategories();
      appActions.setCategories(categoriesCache);
    }
  } catch (error) {
    console.error("카테고리 로드 실패", error);
  }

  try {
    const data = await getProducts(params);

    if (requestId !== getRequestId()) {
      return;
    }

    appActions.setProducts(data.products, {
      total: data.pagination.total,
      hasNext: data.pagination.hasNext,
      page: data.pagination.page,
    });
  } catch (error) {
    if (requestId !== getRequestId()) {
      return;
    }
    appActions.setError(error);
  }
};

// 상세페이지 데이터 로드
export const loadDetailPageData = async (productId) => {
  try {
    const product = await getProduct(productId);

    if (!product) {
      appActions.setDetailError(new Error("상품을 찾을 수 없습니다"));
      return;
    }

    let relatedProducts = [];
    if (product.category1 && product.category2) {
      try {
        const data = await getProducts({
          category1: product.category1,
          category2: product.category2,
          limit: 4,
          page: 1,
        });
        relatedProducts = data.products.filter((p) => p.productId !== productId).slice(0, 2);
      } catch (error) {
        console.error("관련 상품 로드 실패:", error);
      }
    }

    appActions.setDetailProduct(product, relatedProducts);
  } catch (error) {
    console.error("상품 상세 정보 로드 실패:", error);
    appActions.setDetailError(error);
  }
};

// 무한 스크롤 추가 상품 로드
export const loadMoreProducts = async (currentPage) => {
  const params = getQueryParams();

  try {
    const data = await getProducts({
      ...params,
      page: currentPage + 1,
    });

    appActions.appendProducts(data.products, {
      total: data.pagination.total,
      hasNext: data.pagination.hasNext,
      page: data.pagination.page,
    });
  } catch (error) {
    console.error("추가 상품 로드 실패:", error);
    throw error;
  }
};

// 카테고리 캐시 가져오기
export const getCategoriesCache = () => categoriesCache;

// 카테고리 캐시 설정
export const setCategoriesCache = (categories) => {
  categoriesCache = categories;
};
