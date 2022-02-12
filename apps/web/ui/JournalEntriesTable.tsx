import React from "react";
import { BrewMethod } from "db";
import Table from "rc-table";
import { JournalEntryData } from "types";
import { styled, Text } from "ui";
import { BREW_METHOD_TO_STRING, RATING_TO_EMOJI } from "../utils/copy";
import { Badge } from "./Badge";
import { ReadonlyEditor } from "./ReadonlyEditor";

interface Props {
  data: JournalEntryData[];
}

const StyledTable = styled("table", {
  borderCollapse: "collapse",
  width: "100%",
});

const HeaderRow = styled("tr", {
  padding: "$2",
  backgroundColor: "$gray100",
  color: "$gray500",
});

export const JournalEntriesTable = ({ data }: Props) => {
  const [expandedRowKeys, setExpandedRowKeys] = React.useState<React.Key[]>([]);

  const onExpandedRowsChange = (rows: React.Key[]) => {
    setExpandedRowKeys(rows);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value: Date) => {
        return (
          <>
            <Text css={{ fontWeight: "$bold", fontSize: "$1" }}>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "short",
              }).format(new Date(value))}
            </Text>{" "}
            <Text css={{ fontSize: "$1" }}>
              {new Intl.DateTimeFormat("en-US", {
                timeStyle: "short",
              }).format(new Date(value))}
            </Text>
          </>
        );
      },
    },
    {
      title: "Brew method",
      dataIndex: "brewMethod",
      key: "brewMethod",
      render: (value: BrewMethod) => {
        return <Badge>{BREW_METHOD_TO_STRING[value]}</Badge>;
      },
    },
    { title: "Roast", dataIndex: "roast", key: "roast" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
  ];

  const rows = data.map((entry) => {
    return {
      date: entry.updatedAt,
      brewMethod: entry.brewMethod,
      roast: entry.bean.roast,
      rating: RATING_TO_EMOJI[entry.rating],
      key: entry.id,
    };
  });

  return (
    <Table
      columns={columns}
      data={rows}
      components={{
        table: StyledTable,
        header: {
          row: HeaderRow,
        },
      }}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record, idx, indent, expanded) => {
          if (!expanded) return null;

          const entry = data.find((e) => e.id === record.key);

          if (!entry?.note) return null;

          return <ReadonlyEditor value={entry?.note} />;
        },
        // onExpand,
        expandedRowKeys,
        onExpandedRowsChange: (rows) => {
          setExpandedRowKeys(rows as any);
        },
      }}
    />
  );
};
