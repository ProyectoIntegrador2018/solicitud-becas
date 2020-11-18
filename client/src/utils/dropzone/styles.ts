export const baseStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'rgb(138, 131, 131)',
  borderStyle: 'dashed',
  backgroundColor: 'rgb(231, 243, 244)',
  color: 'rgb(162, 160, 160)',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

export const activeStyle = {
  borderColor: '#2196f3',
};

export const acceptStyle = {
  borderColor: '#00e676',
};

export const rejectStyle = {
  borderColor: '#ff1744',
};
