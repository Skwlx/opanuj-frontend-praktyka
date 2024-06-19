import { SearchFormGenderSelect } from './SearchFormGenderSelect';
import { SearchFormNameInput } from './SearchFormNameInput';
import { SearchFormSortSelect } from './SearchFormSortSelect';

type SearchFormProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
};

function SearchForm({
  name,
  setName,
  gender,
  setGender,
  sortOption,
  setSortOption,
}: SearchFormProps) {
  return (
    <form className="space-x-4 flex items-end justify-center">
      <SearchFormNameInput name={name} setName={setName} />
      <SearchFormGenderSelect gender={gender} setGender={setGender} />
      <SearchFormSortSelect
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </form>
  );
}

export default SearchForm;
