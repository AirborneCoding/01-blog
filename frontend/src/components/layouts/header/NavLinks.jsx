import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'posts', text: 'Posts' },
  { id: 3, url: 'categories', text: 'Categories' },
  { id: 4, url: 'about_us', text: 'about us' },
];

const NavLinks = () => {
  const user = useSelector((state) => state.auth);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        // if ((url === 'checkout' || url === 'orders') && !user) return null;
        return (
          <li key={id}>
            <NavLink className='capitalize hover:bg-white hover:text-blog py-3' to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
