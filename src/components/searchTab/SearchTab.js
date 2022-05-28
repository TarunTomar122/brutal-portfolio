import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./SearchTab.module.css";

function useOutsideAlerter(ref, closeSearchTab) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeSearchTab();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const SearchTab = ({ isSearchTabOpen, closeSearchTab }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeSearchTab);

  const searchableItems = [
    "about",
    "contact",
    "projects",
    "resume",
    "skills",
    "social",
  ];

  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          visibility: isSearchTabOpen ? "visible" : "hidden",
        }}
        ref={wrapperRef}
      >
        <div className={styles.search_tab_wrapper}>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Spotlight Search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setSearchResults(
                searchableItems.filter((item) =>
                  item.includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
          <img
            className={styles.search_button_img}
            src="/images/statusicons/6.png"
            alt="search"
          />
        </div>
        <div className={styles.search_results_wrapper}>
          {searchResults.length != 0 && (
            <ul className={styles.search_results_ul}>
              {searchResults.map((item) => (
                <li className={styles.search_results_li} key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {searchResults.length == 0 && (
            <div className={styles.no_results_wrapper}>
              <span>Nothing to show!</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchTab;
