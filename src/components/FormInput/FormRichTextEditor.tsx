import "react-quill/dist/quill.snow.css";

import type { FormInputProps } from "@/components/FormInput/FormInputProps";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
	toolbar: [
		// ["bold", "italic", "underline", "strike", "blockquote"],
		[{ list: "ordered" }, { list: "bullet" }],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};

const RichTextField = ({ control, name }: FormInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => (
				<ReactQuill
					theme="snow"
					placeholder={"Job Description"}
					modules={modules}
					value={value}
					onChange={onChange}
					style={{
						minHeight: "100px",
						borderRadius: "1px",
					}}
				/>
			)}
		/>
	);
};

export default RichTextField;
