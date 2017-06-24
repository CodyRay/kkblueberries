// Import just the plugins you want to use.

// Temporary workaround for https://github.com/googleanalytics/autotrack/issues/137
import 'autotrack/autotrack.js'
// import 'autotrack/lib/plugins/clean-url-tracker';
// import 'autotrack/lib/plugins/max-scroll-tracker';
// import 'autotrack/lib/plugins/media-query-tracker';
// import 'autotrack/lib/plugins/page-visibility-tracker';
// import 'autotrack/lib/plugins/outbound-link-tracker';
// import 'autotrack/lib/plugins/url-change-tracker';

function load(trackingId) {
  if (!window) { return; }
  const ga = window.ga;

  ga('create', trackingId, 'auto');

  // Only require the plugins you've imported above.
  ga('require', 'cleanUrlTracker', {
    indexFilename: 'index.html',
    trailingSlash: 'remove'
  });
  ga('require', 'maxScrollTracker');
  ga('require', 'mediaQueryTracker', {
    definitions: [
      {
        name: 'Breakpoint',
        dimensionIndex: 1,
        items: [
          { name: 'xs', media: 'all' },
          { name: 'sm', media: '(min-width: 768px)' },
          { name: 'md', media: '(min-width: 992px)' },
          { name: 'lg', media: '(min-width: 1200px)' }
        ]
      },
      {
        name: 'Pixel Density',
        dimensionIndex: 2,
        items: [
          { name: '1x', media: 'all' },
          { name: '1.5x', media: '(min-resolution: 144dpi)' },
          { name: '2x', media: '(min-resolution: 192dpi)' }
        ]
      },
      {
        name: 'Orientation',
        dimensionIndex: 3,
        items: [
          { name: 'landscape', media: '(orientation: landscape)' },
          { name: 'portrait', media: '(orientation: portrait)' }
        ]
      }
    ]
  });
  ga('require', 'mediaQueryTracker', {
    sendInitialPageview: true
  });
  ga('require', 'pageVisibilityTracker', {
    sendInitialPageview: true
  });
  ga('require', 'outboundLinkTracker');
  ga('require', 'urlChangeTracker');

  // The command below is no longer needed with pageVisibilityTracker
  // ga('send', 'pageview');
}

export { load };