import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import { NavbarBurger } from "../navbar-burger";
import {
  initialValue as navbarInitialValue,
  NavbarContextValue,
} from "../navbar-context";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validatePropType,
} from "../../../__tests__/testing";

const COMPONENT = NavbarBurger;
const COMPONENT_NAME = "NavbarBurger";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar-burger";

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowWrapperInNavbarContextConsumer = (
  node: JSX.Element,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
) => {
  const navbarContextConsumerWrapper = Enzyme.shallow(node);
  const NavbarContextConsumerChildren = navbarContextConsumerWrapper.props()
    .children;
  const navbarContextConsumerChildrenWrapper = Enzyme.shallow(
    <NavbarContextConsumerChildren {...navbarContextValue} />,
  );
  return navbarContextConsumerChildrenWrapper;
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
) => {
  const navbarContextConsumerChildrenWrapper = makeShallowWrapperInNavbarContextConsumer(
    node,
    navbarContextValue,
  );
  const themeContextConsumerWrapper = navbarContextConsumerChildrenWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as any)
    .children;
  const wrapper = Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
  return wrapper;
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { value: () => null, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      [false, true].map(hasOnClick =>
        it(`should update context ${
          hasOnClick ? "and call provided onClick" : ""
        }`, () => {
          const onClick = jest.fn();
          const setActive = jest.fn();
          const node = makeNode({ onClick: hasOnClick ? onClick : undefined });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
            node,
            themeInitialValue,
            {
              active: false,
              setActive,
            },
          );
          wrapper.simulate("click");
          expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
          expect(setActive.mock.calls).toHaveLength(1);
          expect(setActive.mock.calls[0]).toEqual([true]);
        }),
      );
    });

    describe("role", () => {
      it("should have role: button", () => {
        const node = makeNode({});
        const wrapper = makeShallowWrapperInNavbarContextConsumer(node);
        expect(wrapper.prop("role")).toEqual("button");
      });
    });

    describe("style", () => {
      validatePropType(propTypes, "style", [
        { value: {}, valid: true, descriptor: "obj" },
        { value: "string", valid: false },
      ]);

      it("should preserve custom style", () => {
        const node = makeNode({ style: { margin: "10px" } });
        const wrapper = makeShallowWrapperInNavbarContextConsumer(node);
        expect(wrapper.prop("style")).toHaveProperty("margin", "10px");
        expect(wrapper.prop("style")).toHaveProperty("outline", "none");
      });
    });

    describe("tabIndex", () => {
      it("should have tabIndex", () => {
        const node = makeNode({});
        const wrapper = makeShallowWrapperInNavbarContextConsumer(node);
        expect(wrapper.prop("tabIndex")).toEqual(0);
      });
    });
  });
});
