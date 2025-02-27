"use client";

import { useEffect, useState } from "react";
import { DocumentWidgetInline, Document } from "@/app/DocumenWidgetInline";
 
const DOCUMENT_KEY = "easyblocksQuickDemoDocumentId_v2";
 
export default function MainPage() {
  const [document, setDocument] = useState<null | undefined | Document>(
    undefined
  );
  const [isOpen, setOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

 
  useEffect(() => {
    const documentRaw = localStorage.getItem(DOCUMENT_KEY);

    if (!documentRaw) {
      setDocument(null);
    } else {
      // On this date we've introduced a change for names of text and rich text component.
      // This change is not backwards compatible, so we need to reset the saved document.
      const date = new Date("2023-11-25:00:00:00");
      const parsedDocument = JSON.parse(documentRaw);

      if (parsedDocument.updatedAt < date.getTime()) {
        setDocument(null);
        localStorage.removeItem(DOCUMENT_KEY);
      } else {
        setDocument(parsedDocument);
      }
    }

    setOpen(true);
  }, []);

  if (document === undefined) {
    return null;
  }

   

  return (
    <div className={"relative w-full h-screen flex flex-row"}>
      {!sidebarOpen && (
        <div
          className={
            "basis-8 border-r-neutral-200 border-r flex flex-col items-center px-2 pt-[7px]"
          }
        >
          <button
            type="button"
            className="hover:border border-neutral-200 rounded-sm w-[28px] h-[28px] flex justify-center items-center text-black-1 active:bg-neutral-200"
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className={"w-5 h-5"}
            >
              <path d="m531.692-480-184-184L376-692.308 588.308-480 376-267.692 347.692-296l184-184Z" />
            </svg>
          </button>

          <h2
            className={"text-md font-semibold mt-6"}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Easyblocks demo
          </h2>
        </div>
      )}

      

      <div className={"flex-auto grid bg-white-1"}>
        <DocumentWidgetInline
          isOpen={isOpen}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
          }}
          document={document}
          onSave={(document) => {
            const nowTime = new Date().getTime();
            const documentWithUpdatedTime = { ...document, updatedAt: nowTime };
            setDocument(documentWithUpdatedTime);
            localStorage.setItem(
              DOCUMENT_KEY,
              JSON.stringify(documentWithUpdatedTime)
            );
          }}
        />

        {!isOpen && (
          <div className={"justify-self-center self-center"}>
            <button
              className="bg-black-1 hover:bg-black-2 duration-100 text-white-1 font-medium rounded-2xl py-3 px-5 min-w-[100px]"
              onClick={() => {
                setOpen(true);
              }}
            >
              Open Editor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

 
 
