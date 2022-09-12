import React, { useState } from 'react';

const RepositoriesList = ({
  handleCheckProfile,
  repositoryName,
  userName,
  description = '',
  handleLike,
  isFavorite,
  projectsFavorites,
}) => {
  const [showMoreText, setShowMoreText] = useState(false);
  const handleAdd = async (action) => {
    await handleLike({
      repositoryName,
      userName,
      projectsFavorites,
      action: action,
    });
    handleCheckProfile({});
  };

  const HeartIcon = isFavorite ? (
    <i
      style={{ cursor: 'pointer', color: 'red' }}
      onClick={() => handleAdd('delete')}
      class='fa-solid fa-heart'
    />
  ) : (
    <i
      style={{ cursor: 'pointer' }}
      onClick={() => handleAdd('add')}
      class='fa-regular fa-heart'
    />
  );
  const customAtagStyle = {
    'text-decoration': 'underline',
    cursor: 'pointer',
  };
  const text =
    !showMoreText && description !== null && description.length > 8
      ? description.slice(0, 15) + '...'
      : description;

  return (
    <li class='list-group-item d-flex justify-content-between align-items-center'>
      <div class='d-flex align-items-center'>
        <div className='ms-3'>
          <p className='fw-bold mb-1'>
            {repositoryName} {HeartIcon}
          </p>

          <p className='text-muted mb-0'>{text}</p>
          {!showMoreText && text !== null && description.length > 8 && (
            <p style={customAtagStyle} onClick={() => setShowMoreText(true)}>
              Ver más
            </p>
          )}
          {showMoreText && (
            <p style={customAtagStyle} onClick={() => setShowMoreText(false)}>
              Ver menos
            </p>
          )}
        </div>
      </div>
    </li>
  );
};
export default RepositoriesList;
