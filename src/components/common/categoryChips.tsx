import React, { Fragment } from "react";
import { Box, Divider, Typography, ButtonBase } from "@mui/material";
import StyledBadge from "@todolist/core/styles/styledBadge";
import { CategoryType } from "@todolist/core/models/category.models";
import { getCategoryStats } from "@todolist/core/utils/categoryStats.utils";
import { Task } from "@todolist/core/models/task.model";

export interface ICategoryChipsProps {
  tasks: Task[];
  date: Date;
  selectedCategory: string;
  onCategoryChange: (category: CategoryType) => void;
}

export const CategoryChips = ({
  tasks,
  date,
  selectedCategory,
  onCategoryChange,
}: ICategoryChipsProps) => {
  const stats = getCategoryStats(tasks, date);
  console.log(stats);
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        gap: 1,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          <ButtonBase
            onClick={() => onCategoryChange(stat.label)}
            sx={{ borderRadius: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                pr: 1,
                borderRadius: 1,
                bgcolor: "transparent",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  color:
                    selectedCategory === stat.label ? "#0760FB" : "#9F9F9F",
                }}
              >
                {stat.label}
              </Typography>
              <StyledBadge
                badgeContent={<>{stat.count ?? 0}</>}
                anchorOrigin={{
                  vertical: "bottom",
                }}
                sx={{
                  alignSelf: "center",

                  "& .MuiBadge-badge": {
                    backgroundColor:
                      selectedCategory === stat.label ? "#0760FB" : "#D9D9D9",
                    borderColor:
                      selectedCategory === stat.label ? "#0760FB" : "#D9D9D9",
                  },
                }}
              />
            </Box>
          </ButtonBase>
          {index === 0 && (
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          )}
        </Fragment>
      ))}
    </Box>
  );
};
