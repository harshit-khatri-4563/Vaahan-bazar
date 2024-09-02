"use client";
import Script from "next/script";
import React from "react";

const languages = [
	{ label: "English", value: "en", src: "https://flagcdn.com/h60/us.png" },
	{ label: "हिंदी", value: "hi", src: "https://flagcdn.com/h60/in.png" },
	// Add additional languages as needed
];

const includedLanguages = languages.map((lang) => lang.value).join(",");

function googleTranslateElementInit() {
	new window.google.translate.TranslateElement(
		{
			pageLanguage: "auto",
			includedLanguages,
		},
		"google_translate_element"
	);
}

export function GoogleTranslate({ prefLangCookie }) {
	const [langCookie, setLangCookie] = React.useState(
		decodeURIComponent(prefLangCookie)
	);

	React.useEffect(() => {
		window.googleTranslateElementInit = googleTranslateElementInit;
	}, []);

	const onChange = (value) => {
		const lang = "/en/" + value;
		setLangCookie(lang);
		const element = document.querySelector(".goog-te-combo");
		element.value = value;
		element.dispatchEvent(new Event("change"));
	};

	return (
		<div>
			<div
				id='google_translate_element'
				style={{ display: "none", height: "1px", width:"1px"}}
			></div> 
			<LanguageSelector onChange={onChange} value={langCookie} />
			<Script src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' />
		</div>
	);
}

function LanguageSelector({ onChange, value }) {
	const langCookie = value.split("/")[2];
	return (
        <>
        {"Language:"}
		<select onChange={(e) => onChange(e.target.value)} value={langCookie} >
			{languages.map((it) => (
				<option value={it.value} key={it.value}>
					{it.label}
				</option>
			))}
		</select>
        </>
	);
}
