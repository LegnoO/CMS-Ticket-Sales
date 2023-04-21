/** @format */

export const searchTerm = (e, data, setSearchTerm) => {
  const searchValue = e.target.value.trim().toLowerCase();
  setSearchTerm(
    data.filter((value) => {
      return value.data.event_id.includes(searchValue);
    })
  );
};
