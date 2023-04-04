import { NavLink } from '@/components/atoms';

export default function NavItems({ data }: any) {
  return (
    <>
      {data?.map(({ id, item, collection }: any) => {
        let coll = '';

        switch (collection) {
          case 'Posts':
            coll = 'blog/';
            break;
          case 'Products':
            coll = item.type + 's/';
            break;
        }

        return (
          <NavLink
            key={id}
            href={((item.slug === 'home' || item.slug === '') && '/') ||
              (collection === 'CustomLinks'
                ? item.slug
                : '/' + coll + item.slug)}
            passHref
            className="cursor-pointer "
          >
            <a className="inline-flex items-center px-2 py-1 pt-1 font-medium text-md rounded-xs text-slate-700 hover:bg-gray-300 hover:text-gray-900">
              <span>{item.name}</span>
            </a>
          </NavLink>
        );
      })}
    </>
  );
}
