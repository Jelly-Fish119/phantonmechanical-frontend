import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';
import type { DeepPartial } from './types';
import type { MixinsExtend } from './core/mixins';
import type { CustomShadows } from './core/custom-shadows';
import type { ChipExtendVariant } from './core/components/chip';
import type { RatingExtendSize } from './core/components/rating';
import type { TypographyVariantsExtend } from './core/typography';
import type { BadgeExtendVariant } from './core/components/badge';
import type { SliderExtendColor } from './core/components/slider';
import type { ButtonExtendVariant } from './core/components/button';
import type { FabExtendVariant } from './core/components/button-fab';
import type { ButtonGroupExtendVariant } from './core/components/button-group';
import type { AvatarExtendColor, AvatarGroupExtendVariant } from './core/components/avatar';
import type { PaginationExtendColor, PaginationExtendVariant } from './core/components/pagination';
import type {
  GreyExtend,
  PaletteExtend,
  TypeTextExtend,
  CommonColorsExtend,
  PaletteColorExtend,
  TypeBackgroundExtend,
} from './core/palette';

// ----------------------------------------------------------------------

/* **********************************************************************
 * 🧬 Extend: Core (palette, typography, shadows, mixins...)
 * **********************************************************************/
declare module '@mui/material/styles' {
  /**
   * ➤➤ Palette (https://mui.com/customization/palette/)
   * @from {@link file://./core/palette.ts}
   */
  // primary, secondary, info, success, warning, error
  interface PaletteColor extends PaletteColorExtend {}
  interface SimplePaletteColorOptions extends Partial<PaletteColorExtend> {}

  // text, background, common, grey
  interface Color extends GreyExtend {}
  interface TypeText extends TypeTextExtend {}
  interface CommonColors extends CommonColorsExtend {}
  interface TypeBackground extends TypeBackgroundExtend {}

  // extend palette
  interface Palette extends PaletteExtend {}
  interface PaletteOptions extends DeepPartial<PaletteExtend> {}

  /**
   * ➤➤ Typography (https://mui.com/customization/typography/)
   * @from {@link file://./core/typography.ts}
   */
  interface TypographyVariants extends TypographyVariantsExtend {}
  interface TypographyVariantsOptions extends Partial<TypographyVariantsExtend> {}

  /**
   * ➤➤ Mixins
   * @from {@link file://./core/mixins.ts}
   */
  interface Mixins extends MixinsExtend {}
  interface MixinsOptions extends Partial<MixinsExtend> {}

  /**
   * Register the new variant in the `Theme` interface.
   *
   * ➤➤ Custom shadows
   * @from {@link file://./core/custom-shadows.ts}
   *
   */
  interface Theme {
    customShadows: CustomShadows;
  }
  interface ThemeOptions {
    customShadows?: Partial<CustomShadows>;
  }
  interface ThemeVars {
    customShadows: CustomShadows;
  }
}

/* **********************************************************************
 * 🧬 Extend: Components
 * **********************************************************************/

/**
 * ➤➤ Avatar, AvatarGroup (https://mui.com/components/avatars/)
 * @from {@link file://./core/components/avatar.tsx}
 */
declare module '@mui/material/Avatar' {
  interface AvatarOwnProps extends AvatarExtendColor {}
}
declare module '@mui/material/AvatarGroup' {
  interface AvatarGroupPropsVariantOverrides extends AvatarGroupExtendVariant {}
}

/**
 * ➤➤ Badge (https://mui.com/components/badges/)
 * @from {@link file://./core/components/badge.tsx}
 */
declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides extends BadgeExtendVariant {}
}

/**
 * ➤➤ Button (https://mui.com/components/buttons/)
 * @from {@link file://./core/components/button.tsx}
 */
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides extends ButtonExtendVariant {}
}

/**
 * ➤➤ ButtonGroup (https://mui.com/components/button-group/)
 * @from {@link file://./core/components/button-group.tsx}
 */
declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides extends ButtonGroupExtendVariant {}
}

/**
 * ➤➤ Fab (https://mui.com/components/floating-action-button/)
 * @from {@link file://./core/components/button-fab.tsx}
 */
declare module '@mui/material/Fab' {
  interface FabPropsVariantOverrides extends FabExtendVariant {}
}

/**
 * ➤➤ Chip (https://mui.com/components/chips/)
 * @from {@link file://./core/components/chip.tsx}
 */
declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides extends ChipExtendVariant {}
}

/**
 * ➤➤ Pagination (https://mui.com/components/pagination/)
 * @from {@link file://./core/components/pagination.tsx}
 */
declare module '@mui/material/Pagination' {
  interface PaginationPropsVariantOverrides extends PaginationExtendVariant {}
  interface PaginationPropsColorOverrides extends PaginationExtendColor {}
}
declare module '@mui/material/PaginationItem' {
  interface PaginationItemPropsVariantOverrides extends PaginationExtendVariant {}
  interface PaginationItemPropsColorOverrides extends PaginationExtendColor {}
}

/**
 * ➤➤ Slider (https://mui.com/components/slider/)
 * @from {@link file://./core/components/slider.tsx}
 */
declare module '@mui/material/Slider' {
  interface SliderPropsColorOverrides extends SliderExtendColor {}
}

/**
 * ➤➤ Rating (https://mui.com/components/rating/)
 * @from {@link file://./core/components/rating.tsx}
 */
declare module '@mui/material/Rating' {
  interface RatingPropsSizeOverrides extends RatingExtendSize {}
}
