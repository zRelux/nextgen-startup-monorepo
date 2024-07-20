"use client";
import { Overlay } from "@gluestack-ui/overlay";
import { cssInterop } from "nativewind";
import React from "react";

cssInterop(Overlay, { className: "style" });

export const Portal = React.forwardRef(
	(
		{
			...props
		}: {
			className?: string & React.ComponentProps<typeof Overlay>;
		},
		ref?: any,
	) => {
		return <Overlay {...props} ref={ref} />;
	},
);
