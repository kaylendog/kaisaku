import { basename } from "path";
import * as ts from "typescript";

export const emitVersionFile = (
	path: string,
	versionInfo: Record<string, string>
) => {
	// create exports
	const exports = Object.entries(versionInfo).map(([key, value]) => {
		const specifier = ts.factory.createExportSpecifier(
			false,
			undefined,
			key
		);

		// create assignment
		const modifier = ts.factory.createModifier(ts.SyntaxKind.ConstKeyword);
		const assignment = ts.factory.createExportAssignment(
			[modifier],
			true,
			ts.factory.createStringLiteral(value)
		);
	});

	// open result file
	const resultFile = ts.createSourceFile(
		basename(path),
		"",
		ts.ScriptTarget.Latest,
		false
	);
	const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
	// print nodes to the file

	const result = printer.printList(
		ts.ListFormat.None,
		namedExports.elements,
		resultFile
	);
	console.log(result);
};

emitVersionFile("./test.ts", {
	hello: "hello",
});
