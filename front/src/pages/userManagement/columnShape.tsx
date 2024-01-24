import FlexBox from "../../components/FlexBox";
import { H6, Small, Tiny } from "../../components/Typography";

const UserListColumnShape = [
  {
    Header: "Id",
    accessor: "id",
    minWidth: 200,
    Cell: ({ row }: any) => {
      const { avatar, name, address } = row.original;
      return (
        <FlexBox alignItems="center">
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{name}</H6>
            <Tiny color="text.disabled">{address}</Tiny>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: "Status du Ticket",
    accessor: "status",
    minWidth: 200,
    Cell: ({ value }: any) => (
      <Small
        sx={{
          borderRadius: 10,
          padding: ".2rem 1rem",
          color: "background.paper",
          backgroundColor: "#A798FF",
        }}
      >
        {value}
      </Small>
    ),
  },
  {
    Header: "Description",
    accessor: "description",
    minWidth: 150,
  },
  {
    Header: "Date & Heure",
    accessor: "date",
    minWidth: 150,
  },

];

export default UserListColumnShape;

