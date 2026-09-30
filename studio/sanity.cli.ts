import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'fmxto53a',
    dataset: 'production'
  },
  studioHost: 'utility-valet',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'w7e4hy6xcgmsudh8p8g9ybf3',
  },
})
