import { qs } from "../Questions";
import { CATEGORIES } from '../Categories';

function Menu({ category, setCategory, setRound, setMenuOpen, setShowResult }) {

  function handleCategoryClick(catName) {
    setCategory(catName);
    setShowResult(false);
    setRound(0);
    setMenuOpen(false);
  }

  return (
    <ul className="sidebar-pills">
      {CATEGORIES.map((cat) => (
        <li key={cat.name}>
          <span className={`pill-title ${cat.name} ${(cat.name === category) ? 'active' : null}`} onClick={() => handleCategoryClick(cat.name)}>{cat.name} ({qs[cat.name].length})</span>
        </li>
      ))}
    </ul>
  )
};

export default Menu;