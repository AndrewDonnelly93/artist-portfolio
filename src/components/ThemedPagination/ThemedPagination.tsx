import { useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

interface ThemedPaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const ThemedPagination: React.FC<ThemedPaginationProps> = ({ count, page, onChange }) => {
  const theme = useTheme();

  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
      sx={{
        '& button': {
          color:
            theme.palette.mode === 'light'
              ? theme.palette.text.primary
              : theme.palette.text.secondary,
          borderColor:
            theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700],
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.background.paper
              : theme.palette.background.default,
          transition: 'background-color 0.3s ease',
        },
        '& button:hover': {
          backgroundColor:
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        },
        '& .Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
      }}
    />
  );
};

export default ThemedPagination;
