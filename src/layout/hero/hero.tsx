import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { Colors, COLORS } from "src/base/helpers";
import { tuple } from "src/utils";
import { HeroBody } from "./hero-body";
import { HeroFoot } from "./hero-foot";
import { HeroHead } from "./hero-head";

export const HERO_SIZES = tuple(
  "medium",
  "large",
  "fullheight",
  "fullheight-with-navbar",
);
export type HeroSizes = (typeof HERO_SIZES)[number];

export type HeroModifierProps = Partial<{
  color: Colors;
  gradient: boolean;
  size: HeroSizes;
}>;

export type HeroProps = HelpersProps & HeroModifierProps;

const propTypes = {
  color: PropTypes.oneOf(COLORS),
  gradient: PropTypes.bool,
  size: PropTypes.oneOf(HERO_SIZES),
};

export const Hero = Object.assign(
  forwardRefAs<HeroProps, "section">(
    ({ className, color, gradient, size, ...rest }, ref) => (
      <Generic
        className={classNames(
          "hero",
          {
            "is-bold": gradient,
            [`is-${color}`]: color,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "section" },
  ),
  {
    Body: HeroBody,
    Foot: HeroFoot,
    Head: HeroHead,
    propTypes,
  },
);
