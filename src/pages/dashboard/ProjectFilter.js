const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];
export default function ProjectFilter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {filterList.map((b) => (
          <button
            className={currentFilter === b ? "active" : ""}
            key={b}
            onClick={() => handleClick(b)}
          >
            {b}
          </button>
        ))}
      </nav>
    </div>
  );
}
