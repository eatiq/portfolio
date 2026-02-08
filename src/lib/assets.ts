/**
 * Centralized asset URLs for the portfolio.
 * All images are hosted on Cloudflare R2.
 * Videos use two R2 buckets: msvid and ehsanvideos.
 *
 * To update an asset, upload the new file to the R2 bucket
 * and update the corresponding URL here.
 */

const R2_BASE = "https://pub-5bb086b3946849a39897e875fa7e5fd9.r2.dev";
const R2_VIDEOS = "https://pub-b3b956d5ced14f8dbb0fff5838bcb4cc.r2.dev";

export const assets = {
  shared: {
    favicon: `${R2_BASE}/portfolio/shared/favicon.png`,
    logo: `${R2_BASE}/portfolio/shared/logo.svg`,
    ogImage: `${R2_BASE}/portfolio/shared/og-image.jpg`,
  },

  homepage: {
    copilotThumb: `${R2_BASE}/portfolio/homepage/copilot-thumb.jpg`,
    windowsThumb: `${R2_BASE}/portfolio/homepage/windows-thumb.jpg`,
    cartersThumb: `${R2_BASE}/portfolio/homepage/carters-thumb.jpg`,
    metaThumb: `${R2_BASE}/portfolio/homepage/meta-thumb.jpg`,
    projectThumb5: `${R2_BASE}/portfolio/homepage/project-thumb-5.jpg`,
    projectThumb6: `${R2_BASE}/portfolio/homepage/project-thumb-6.jpg`,
  },

  about: {
    photo1: `${R2_BASE}/portfolio/about/ehsan-photo-1.jpg`,
    photo2: `${R2_BASE}/portfolio/about/ehsan-photo-2.jpg`,
    photo3: `${R2_BASE}/portfolio/about/ehsan-photo-3.jpg`,
  },

  copilot: {
    hero: `${R2_BASE}/portfolio/copilot/hero.jpg`,
    overview: `${R2_BASE}/portfolio/copilot/overview.png`,
    problemChatResponse: `${R2_BASE}/portfolio/copilot/problem-chat-response.png`,
    problemMsStartShopping: `${R2_BASE}/portfolio/copilot/problem-ms-start-shopping.jpg`,
    problemEngAttempt1: `${R2_BASE}/portfolio/copilot/problem-eng-attempt-1.png`,
    problemEngAttempt2: `${R2_BASE}/portfolio/copilot/problem-eng-attempt-2.png`,
    solutionFinal: `${R2_BASE}/portfolio/copilot/solution-final.jpg`,
    solutionDetails: `${R2_BASE}/portfolio/copilot/solution-details.png`,
    solutionTileVariants: `${R2_BASE}/portfolio/copilot/solution-tile-variants.jpg`,
    solutionComparisonTable: `${R2_BASE}/portfolio/copilot/solution-comparison-table.jpg`,
    solutionEdgeBrowser: `${R2_BASE}/portfolio/copilot/solution-edge-browser.png`,
    solutionMobileCarousel: `${R2_BASE}/portfolio/copilot/solution-mobile-carousel.jpg`,
    processExploration: `${R2_BASE}/portfolio/copilot/process-exploration.png`,
    processSurveyOptions: `${R2_BASE}/portfolio/copilot/process-survey-options.jpg`,
    processSurveyResults: `${R2_BASE}/portfolio/copilot/process-survey-results.png`,
    processQualitativeStudy: `${R2_BASE}/portfolio/copilot/process-qualitative-study.jpg`,
    processQualitativeResults: `${R2_BASE}/portfolio/copilot/process-qualitative-results.png`,
    processRefinement: `${R2_BASE}/portfolio/copilot/process-refinement.png`,
    // Videos (already in R2)
    videoTableCompar: `${R2_BASE}/table-compar.mov`,
    videoTableGpt1: `${R2_BASE}/tablegpt1.mov`,
    videoTableGpt2: `${R2_BASE}/tablegpt2.mov`,
    videoTablePdp: `${R2_BASE}/tablle-pdp.mov`,
    videoTableMockscenario: `${R2_VIDEOS}/table-mockscenario.mov`,
  },

  windows: {
    hero: `${R2_BASE}/portfolio/windows/hero.jpg`,
    overview: `${R2_BASE}/portfolio/windows/overview.png`,
    scope: `${R2_BASE}/portfolio/windows/scope.jpg`,
    loadingStates: `${R2_BASE}/portfolio/windows/loading-states.jpg`,
    searchBox: `${R2_BASE}/portfolio/windows/search-box.jpg`,
    final: `${R2_BASE}/portfolio/windows/final.jpg`,
    details: `${R2_BASE}/portfolio/windows/details.png`,
    learnings: `${R2_BASE}/portfolio/windows/learnings.jpg`,
    extra: `${R2_BASE}/portfolio/windows/extra.jpg`,
    // Videos (already in R2)
    videoShimmer: `${R2_BASE}/win1-shimmer.mov`,
    videoShimVar: `${R2_BASE}/win2-shimvar.mov`,
    videoDropdown: `${R2_BASE}/win3-dropdown.mov`,
    videoProviderbar: `${R2_BASE}/win4-providerbar.mov`,
    videoTopEdge: `${R2_BASE}/win5-topedge.mov`,
    videoTopWkey: `${R2_BASE}/win6-topwkey.mov`,
    videoFinal: `${R2_BASE}/win7-final.mov`,
  },

  carters: {
    hero: `${R2_BASE}/portfolio/carters/hero.jpg`,
    overview: `${R2_BASE}/portfolio/carters/overview.png`,
    research: `${R2_BASE}/portfolio/carters/research.jpeg`,
    researchDetail: `${R2_BASE}/portfolio/carters/research-detail.png`,
    redesign1: `${R2_BASE}/portfolio/carters/redesign-1.jpg`,
    redesign2: `${R2_BASE}/portfolio/carters/redesign-2.jpg`,
    redesign3: `${R2_BASE}/portfolio/carters/redesign-3.jpg`,
    redesign4: `${R2_BASE}/portfolio/carters/redesign-4.jpg`,
    redesign5: `${R2_BASE}/portfolio/carters/redesign-5.jpg`,
    impact1: `${R2_BASE}/portfolio/carters/impact-1.jpg`,
    impact2: `${R2_BASE}/portfolio/carters/impact-2.jpg`,
    impact3: `${R2_BASE}/portfolio/carters/impact-3.jpg`,
    impact4: `${R2_BASE}/portfolio/carters/impact-4.jpg`,
    impact5: `${R2_BASE}/portfolio/carters/impact-5.jpg`,
    extra1: `${R2_BASE}/portfolio/carters/extra-1.jpg`,
    extra2: `${R2_BASE}/portfolio/carters/extra-2.jpg`,
    extra3: `${R2_BASE}/portfolio/carters/extra-3.jpg`,
    extra4: `${R2_BASE}/portfolio/carters/extra-4.jpg`,
    extra5: `${R2_BASE}/portfolio/carters/extra-5.jpg`,
    extra6: `${R2_BASE}/portfolio/carters/extra-6.jpg`,
    // Videos (already in R2)
    videoCheckout: `${R2_VIDEOS}/car-proto-checkout.mp4`,
    videoHomeScroll: `${R2_VIDEOS}/car-proto-homescroll.mp4`,
    videoSearch: `${R2_VIDEOS}/car-proto-search.mp4`,
  },

  motion: {
    // Full prototypes (Microsoft)
    msPdpPrototype: `${R2_BASE}/ms-PDPprototype.mp4`,
    msProductsOnHover: `${R2_BASE}/ms-ProductsOnHover.mp4`,
    msLiveProto: `${R2_BASE}/ms-live-proto.mp4`,
    msTrending: `${R2_BASE}/ms-trending.mp4`,
    msDragToCart: `${R2_BASE}/ms-dragtocart.mp4`,
    msCardlink: `${R2_BASE}/ms-cardlink.mp4`,
    msCashbackBoosted: `${R2_BASE}/ms-cashback-boosted.mp4`,
    // Full prototypes (Carter's)
    carCheckout: `${R2_VIDEOS}/car-proto-checkout.mp4`,
    carHomeScroll: `${R2_VIDEOS}/car-proto-homescroll.mp4`,
    carSearch: `${R2_VIDEOS}/car-proto-search.mp4`,
    // Micro-interactions
    msCouponMicro: `${R2_BASE}/ms-coupon-micro.mp4`,
    msCbActivated: `${R2_BASE}/ms-cbactivated.mov`,
    carHeart: `${R2_VIDEOS}/car-heart.mp4`,
    carHeartbreak: `${R2_VIDEOS}/car-heartbreak.mp4`,
    carWishlist: `${R2_VIDEOS}/car-wishlist.mp4`,
    carSplash: `${R2_VIDEOS}/car-splash.mp4`,
    carRocketTakeoff: `${R2_VIDEOS}/car-rockettakeoff.mov`,
    // Logo animations
    carLogo: `${R2_VIDEOS}/car_logo.mp4`,
    carBurst: `${R2_VIDEOS}/car_burst.mp4`,
    carPlane: `${R2_VIDEOS}/car_plane.mp4`,
    // Animation loops
    gooMapFinal: `${R2_VIDEOS}/goo-mapfinal.mp4`,
    igePokerolla: `${R2_VIDEOS}/ige-pokerolla.mp4`,
  },

  meta: {
    video1: "https://meta.r2.dev/video1.mov",
  },
} as const;

export default assets;
