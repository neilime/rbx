import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Progress, PROGRESS_DEFAULTS } from "src/elements/progress/progress";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateNumberPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Progress;
const DISPLAY_NAME = "Progress";
const DEFAULT_ELEMENT = "progress";
const BULMA_CLASS_NAME = "progress";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: {
      as: DEFAULT_ELEMENT,
      max: 100,
    },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = <Progress color={color} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("max", () => {
      validateNumberPropType(propTypes, "max");

      it("should have max", () => {
        const max = 20;
        const node = <Progress max={max} />;
        const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
        expect(
          (wrapper.props() as React.ProgressHTMLAttributes<Element>).max,
        ).toBe(max);
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      PROGRESS_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Progress size={size} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("value", () => {
      validateNumberPropType(propTypes, "value");

      it("should have value", () => {
        const value = 0;
        const node = <Progress value={value} />;
        const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
        expect(
          (wrapper.props() as React.ProgressHTMLAttributes<Element>).value,
        ).toBe(value);
      });
    });
  });
});
