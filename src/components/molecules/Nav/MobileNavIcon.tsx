

export default function MobileNavIcon({ open, data }: any) {
  // console.log('data->',data)
  return (
    <>
      {open ? (
        <span
          style={{
            color: data?.accentColor ? data.accentColor : '#1D4ED8',
          }}
          aria-hidden="true"
          className="block overflow-visible font-medium material-symbols-outlined h-7 w-7"
        >
          close
        </span>
      ) : (
        <span
          style={{
            color: data?.accentColor ? data.accentColor : '#1D4ED8',
          }}
          aria-hidden="true"
          className="block overflow-visible font-medium material-symbols-outlined h-7 w-7"
        >
          menu
        </span>
      )}
    </>
  );
}
