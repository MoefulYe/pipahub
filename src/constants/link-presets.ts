import { LinkPreset, type NavBarLink } from '@/types/config'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

export const LinkPresets: Record<LinkPreset, NavBarLink> = {
  [LinkPreset.Home]: {
    name: i18n(I18nKey.home),
    url: '/',
  },
  [LinkPreset.About]: {
    name: i18n(I18nKey.about),
    url: '/about/',
  },
  [LinkPreset.Archive]: {
    name: i18n(I18nKey.archive),
    url: '/archive/',
  },
  [LinkPreset.LinkGraph]: {
    name: i18n(I18nKey.linkGraph),
    url: '/link-graph/',
  }
}
