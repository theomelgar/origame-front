import styled from 'styled-components';

export default function CategoryBar ({ categories }){
  return (
    <CategoryBarWrapper>
      <CategorySelect>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category.name}>{category.name}</option>
        ))}
      </CategorySelect>
    </CategoryBarWrapper>
  );
};

const CategoryBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  height: 50px;
`;

const CategorySelect = styled.select`
  width: 200px;
  height: 100%;
  cursor: pointer;
  border: none;
  padding: 5px;
  font-size: 14px;
  outline: red 20px;
`;
