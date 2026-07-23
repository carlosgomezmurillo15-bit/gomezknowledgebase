import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Custom navigation order for the 5K knowledge base
const pageOrder = [
  // Main categories
  "1.running-basics",
  "2.weekly-training-plan",
  "3.speed-workouts",
  "4.strength-and-mobility",
  "5.recovery-and-injury-prevention",
  "6.nutrition-and-hydration",
  "7.race-day-strategy",

  // Running Basics
  "proper-running-form",
  "understanding-running-pace",
  "building-aerobic-endurance",

  // Weekly Training Plan
  "training-overview",
  "easy-run-days",
  "speed-workouts",
  "long-run-day",
  "rest-and-recovery",

  // Speed Workouts
  "interval-training",
  "tempo-runs",
  "hill-repeats",

  // Strength and Mobility
  "strength-training-for-runners",
  "mobility-and-flexibility",
  "core-training-for-running",

  // Recovery and Injury Prevention
  "post-run-recovery",
  "common-running-injuries",
  "sleep-and-performance",

  // Nutrition and Hydration
  "fueling-for-running",
  "hydration-for-runners",
  "pre-and-post-run-nutrition",

  // Race Day Strategy
  "race-day-pacing",
  "race-morning-preparation",
  "finishing-the-5k-strong",

  // Additional coursework
  "Analyzing an Organizing System",
]

// Components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],

  footer: Component.Footer({
    links: {
      GitHub:
        "https://github.com/carlosgomezmurillo15-bit/gomezknowledgebase",
    },
  }),
}

// Main content pages
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],

  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),

    Component.DesktopOnly(
      Component.Explorer({
        title: "5K Training Guide",
        folderDefaultState: "collapsed",
        folderClickBehavior: "link",
        useSavedState: false,

        // Hide folders visitors do not need to browse
        filterFn: (node) => {
          const name = node.slugSegment.toLowerCase()

          return (
            name !== "tags" &&
            name !== "assets" &&
            !name.startsWith("example-category") &&
            !name.startsWith("example-folder") &&
            name !== "example-doc-01"
          )
        },

        // Keep the knowledge base in a logical training order
        sortFn: (a, b) => {
          // Always show folders before individual files
          if (a.isFolder !== b.isFolder) {
            return a.isFolder ? -1 : 1
          }

          const aIndex = pageOrder.indexOf(a.slugSegment)
          const bIndex = pageOrder.indexOf(b.slugSegment)

          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex
          }

          if (aIndex !== -1) return -1
          if (bIndex !== -1) return 1

          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        },
      }),
    ),
  ],

  right: [
    Component.DesktopOnly(
      Component.TableOfContents({
        layout: "modern",
      }),
    ),
  ],
}

// Folder and list pages
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],

  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),

    Component.DesktopOnly(
      Component.Explorer({
        title: "5K Training Guide",
        folderDefaultState: "collapsed",
        folderClickBehavior: "link",
        useSavedState: false,

        filterFn: (node) => {
          const name = node.slugSegment.toLowerCase()

          return (
            name !== "tags" &&
            name !== "assets" &&
            !name.startsWith("example-category") &&
            !name.startsWith("example-folder") &&
            name !== "example-doc-01"
          )
        },

        sortFn: (a, b) => {
          if (a.isFolder !== b.isFolder) {
            return a.isFolder ? -1 : 1
          }

          const aIndex = pageOrder.indexOf(a.slugSegment)
          const bIndex = pageOrder.indexOf(b.slugSegment)

          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex
          }

          if (aIndex !== -1) return -1
          if (bIndex !== -1) return 1

          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        },
      }),
    ),
  ],

  right: [],
}
