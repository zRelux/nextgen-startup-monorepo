"use client";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import React from "react";
import { ImageBackground as RNImageBackground } from "react-native";
export const ImageBackground = React.forwardRef(({ className, ...props }: any, ref?: any) => {
	return <RNImageBackground className={tva({ base: className })} {...props} ref={ref} />;
});
