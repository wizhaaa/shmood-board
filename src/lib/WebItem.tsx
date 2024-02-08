import {useEffect, useRef, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import DragGrab from "../assets/drag.svg";
import OptionsIcon from "../assets/more-options.svg";
import EditIcon from "../assets/pencil.svg";
import TrashIcon from "../assets/trash.svg";
import RefreshIcon from "../assets/refresh.svg";
import ExternalLinkIcon from "../assets/external-link.svg";
import SaveIcon from "../assets/check.svg";
import CancelIcon from "../assets/cancel.svg";

/**  Renders an Web Item on a board.
 * @param options - default to edit, delete
 * @param item - the item object itself
 * @param children - any children to render as a "footer"
 */
export function WebItem(props: Readonly<PropTypes>) {
  // options are the functions when click the [...] more options panel
  // web item => call website?
  const {options, item, children, minimal} = props;

  // DND-sortable setup
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({
      id: item.id,
      data: {
        type: "website",
        item: item,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [validURL, setValidURL] = useState<boolean | unknown>(true);

  function handleError() {
    setValidURL(false);
  }

  // Show Options
  const [showOptions, setShowOptions] = useState(false);
  const [showDrag, setShowDrag] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  // Handle click off drop down menu
  useEffect(() => {
    function handleClickOffOptions(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOffOptions);

    return () => {
      document.removeEventListener("mousedown", handleClickOffOptions);
    };
  });

  // Editing Logic
  const [editing, setEditing] = useState(false);
  const [webURL, setWebURL] = useState<string>(item.content);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    options?.editItem(item.id, webURL);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setWebURL(item.content);
  };

  /* HANDLE RELOAD */
  const iframeRef = useRef<HTMLIFrameElement>(null);
  function refreshIframe() {
    if (iframeRef && iframeRef.current) {
      iframeRef.current.src = item.content;
    }
  }

  const draggingStyle = {
    opacity: "0.1",
  };

  return (
    <div
      className="wz-image-item"
      ref={setNodeRef}
      style={{...style, ...(isDragging ? draggingStyle : {})}}
    >
      {!minimal && (
        <div>
          <div
            className="wz-item-toolbar"
            ref={optionsRef}
            onMouseEnter={() => setShowDrag(true)}
            onMouseLeave={() => setShowDrag(false)}
          >
            <img className="wz-pfp-icon" src={item.icon} alt="pfp" />
            {showDrag ? (
              <img
                className="wz-drag-icon"
                src={DragGrab}
                alt="drag"
                {...attributes}
                {...listeners}
              />
            ) : (
              <div>{item.title}</div>
            )}
            <img
              className="wz-options-icon"
              src={OptionsIcon}
              alt="options"
              onClick={() => {
                setShowOptions((s) => !s);
              }}
            />
          </div>

          {editing && (
            <div className="wz-url-bar">
              <input
                className="wz-url-bar-input"
                type="text"
                value={webURL}
                onChange={(e) => setWebURL(e.target.value)}
                onFocus={(e) => e.target.setSelectionRange(0, 0)}
                autoFocus
              ></input>
              <div className="wz-url-bar-icons">
                <img
                  className="wz-url-icons"
                  src={SaveIcon}
                  alt="save"
                  onClick={handleSave}
                />
                <img
                  className="wz-url-icons"
                  src={CancelIcon}
                  alt="cancel"
                  onClick={handleCancel}
                />
              </div>
            </div>
          )}
          {!editing && (
            <div className="wz-url-bar">
              <div className="wz-url-bar-text">{item.content}</div>
              <div className="wz-url-bar-icons">
                <img
                  className="wz-url-icons"
                  src={RefreshIcon}
                  alt="refresh"
                  onClick={refreshIframe}
                />
                <a href={item.content} target="_blank" rel="noopner noreferrer">
                  <img
                    className="wz-url-icons"
                    src={ExternalLinkIcon}
                    alt="refresh"
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
      {showOptions && <Options />}
      <div className="wz-web-content">
        {validURL! && (
          <div className="wz-iframe-container">
            <iframe
              ref={iframeRef}
              className="wz-iframe"
              title="hi"
              loading="lazy"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              src={item.content}
              onError={handleError}
            />
          </div>
        )}

        <div className="wz-invalid-img-text">
          {!validURL && !editing && "Invalid URL"}
        </div>
      </div>
      {children ? children(item.id) : null}
    </div>
  );

  function Options() {
    return (
      <div className="wz-options" ref={optionsRef}>
        <div
          className="wz-options-row"
          onClick={() => {
            handleEditClick();
            setShowOptions((s) => !s);
          }}
        >
          Edit <img src={EditIcon} alt="edit-icon" />
        </div>
        <div
          className="wz-options-row"
          onClick={() => {
            options?.deleteItem(item.id);
            setShowOptions((s) => !s);
          }}
        >
          Delete <img src={TrashIcon} alt="delete-icon" />
        </div>
      </div>
    );
  }
}

type OptionType = {
  deleteItem: (id: number | string) => void;
  editItem: (id: number | string, newContent: string) => void;
};

type PropTypes = {
  id?: string | number;
  item: Item;
  options?: OptionType;
  children?: (id: string | number) => JSX.Element;
  minimal?: boolean;
};

import type {Item} from "./Types";
