import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { getBreakPointValue, useBreakpointValue } from "@gluestack-ui/nativewind-utils/useBreakpointValue";
import { cssInterop } from "nativewind";
import React, { useEffect, useState, createContext, useContext, useMemo, forwardRef } from "react";
import { Dimensions, Platform, View } from "react-native";
import { gridItemStyle, gridStyle } from "./styles";
const { width } = Dimensions.get("window");

const GridContext = createContext<any>({});
type IGridProps = React.ComponentProps<typeof View> &
	VariantProps<typeof gridStyle> & {
		gap?: number;
		rowGap?: number;
		columnGap?: number;
		flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
		padding?: number;
		paddingLeft?: number;
		paddingRight?: number;
		paddingStart?: number;
		paddingEnd?: number;
		_extra: {
			className: string;
		};
	};

type IGridItemProps = React.ComponentProps<typeof View> &
	VariantProps<typeof gridItemStyle> & {
		index?: number;
		_extra: {
			className: string;
		};
	};

function arrangeChildrenIntoRows({
	childrenArray,
	colSpanArr,
	numColumns,
}: {
	childrenArray: React.ReactNode[];
	colSpanArr: number[];
	numColumns: number;
}) {
	let currentRow = 1;
	let currentRowTotalColSpan = 0;

	// store how many items in each row
	const rowItemsCount: {
		[key: number]: number[];
	} = {};

	for (let i = 0; i < childrenArray.length; i++) {
		const colSpan = colSpanArr[i];

		// if current row is full, go to next row
		if (currentRowTotalColSpan + colSpan > numColumns) {
			currentRow++;
			currentRowTotalColSpan = colSpan;
		} else {
			// if current row is not full, add colSpan to current row
			currentRowTotalColSpan += colSpan;
		}

		rowItemsCount[currentRow] = rowItemsCount[currentRow] ? [...rowItemsCount[currentRow], i] : [i];
	}

	return rowItemsCount;
}

function generateResponsiveNumColumns({ gridClass }: { gridClass: string }) {
	const gridClassNamePattern = /\b(?:\w+:)?grid-cols-?\d+\b/g;
	const numColumns = gridClass?.match(gridClassNamePattern);

	if (!numColumns) {
		return 12;
	}

	const regex = /^(?:(\w+):)?grid-cols-?(\d+)$/;
	const result: any = {};

	for (const classname of numColumns) {
		const match = classname.match(regex);
		if (match) {
			const prefix = match[1] || "default";
			const value = Number.parseInt(match[2], 10);
			result[prefix] = value;
		}
	}

	return result;
}

function generateResponsiveColSpans({
	gridItemClassName,
}: {
	gridItemClassName: string;
}) {
	const gridClassNamePattern = /\b(?:\w+:)?col-span-?\d+\b/g;

	const colSpan: any = gridItemClassName?.match(gridClassNamePattern);

	if (!colSpan) {
		return 1;
	}

	const regex = /^(?:(\w+):)?col-span-?(\d+)$/;
	const result: any = {};

	for (const classname of colSpan) {
		const match = classname.match(regex);
		if (match) {
			const prefix = match[1] || "default";
			const value = Number.parseInt(match[2], 10);
			result[prefix] = value;
		}
	}

	return result;
}

const Grid = forwardRef(({ className, _extra, children, ...props }: IGridProps, ref?: any) => {
	const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);

	const gridClass = _extra?.className;
	const obj = generateResponsiveNumColumns({ gridClass });
	const responsiveNumColumns: any = useBreakpointValue(obj);

	const itemsPerRow = useMemo(() => {
		// get the colSpan of each child
		const colSpanArr = React.Children.map(children, (child: any) => {
			const gridItemClassName = child?.props?._extra?.className;

			const colSpan2 = getBreakPointValue(generateResponsiveColSpans({ gridItemClassName }), width);
			const colSpan = colSpan2 ? colSpan2 : 1;

			if (colSpan > responsiveNumColumns) {
				return responsiveNumColumns;
			}

			return colSpan;
		});

		const childrenArray = React.Children.toArray(children);

		const rowItemsCount = arrangeChildrenIntoRows({
			childrenArray,
			colSpanArr,
			numColumns: responsiveNumColumns,
		});

		return rowItemsCount;
	}, [responsiveNumColumns, children]);

	const childrenWithProps = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { index } as any);
		}

		return child;
	});

	const gridClassMerged = `${Platform.select({
		web: gridClass ?? "",
	})}`;

	const contextValue = useMemo(() => {
		return {
			calculatedWidth,
			numColumns: responsiveNumColumns,
			itemsPerRow,
			flexDirection: props?.flexDirection || "row",
			gap: props?.gap || 0,
			columnGap: props?.columnGap || 0,
		};
		// biome-ignore lint/correctness/useExhaustiveDependencies: Provided like this by design
	}, [calculatedWidth, itemsPerRow, responsiveNumColumns, props]);

	return (
		<GridContext.Provider value={contextValue}>
			<View
				ref={ref}
				className={gridStyle({
					class: `${className} ${gridClassMerged}`,
				})}
				onLayout={(event: any) => {
					const paddingLeftToSubtract = props?.paddingStart || props?.paddingLeft || props?.padding || 0;

					const paddingRightToSubtract = props?.paddingEnd || props?.paddingRight || props?.padding || 0;

					const width = event.nativeEvent.layout.width - paddingLeftToSubtract - paddingRightToSubtract;

					setCalculatedWidth(width);
				}}
				{...props}
			>
				{calculatedWidth && childrenWithProps}
			</View>
		</GridContext.Provider>
	);
});

//@ts-ignore
cssInterop(Grid, {
	className: {
		target: "style",
		nativeStyleToProp: {
			gap: "gap",
			rowGap: "rowGap",
			columnGap: "columnGap",
			flexDirection: "flexDirection",
			padding: "padding",
			paddingLeft: "paddingLeft",
			paddingRight: "paddingRight",
			paddingStart: "paddingStart",
			paddingEnd: "paddingEnd",
		},
	},
});

const GridItem = forwardRef(({ className, _extra, ...props }: IGridItemProps, ref?: any) => {
	const [flexBasisValue, setFlexBasisValue] = useState<number | string | null>("auto");

	const { calculatedWidth, numColumns, itemsPerRow, flexDirection, gap, columnGap } = useContext(GridContext);

	const gridItemClass = _extra?.className;
	const responsiveColSpan: any = useBreakpointValue(generateResponsiveColSpans({ gridItemClassName: gridItemClass }));

	// biome-ignore lint/correctness/useExhaustiveDependencies: Provided like this by design
	useEffect(() => {
		if (!flexDirection?.includes("column") && calculatedWidth && numColumns > 0 && responsiveColSpan > 0) {
			// find out in which row of itemsPerRow the current item's index is
			const row = Object.keys(itemsPerRow).find((key) => {
				return itemsPerRow[key].includes(props?.index);
			});

			const rowColsCount = itemsPerRow[row as string].length;

			const space = columnGap || gap || 0;

			const gutterOffset = space * (rowColsCount === 1 && responsiveColSpan < numColumns ? 2 : rowColsCount - 1);

			const flexBasisVal = `${Math.min((((calculatedWidth - gutterOffset) * responsiveColSpan) / numColumns / calculatedWidth) * 100, 100)}%`;

			setFlexBasisValue(flexBasisVal);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calculatedWidth, responsiveColSpan, numColumns, columnGap, gap, flexDirection]);

	return (
		<View
			ref={ref}
			gridItemClass={gridItemClass}
			className={gridItemStyle({
				class: `${className} ${Platform.select({ web: gridItemClass ?? "" })}` ?? "",
			})}
			//@ts-ignore
			style={{
				flexBasis: flexBasisValue,
			}}
			{...props}
		/>
	);
});

Grid.displayName = "Grid";
GridItem.displayName = "GridItem";

export { Grid, GridItem };
