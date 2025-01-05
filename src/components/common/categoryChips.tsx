"use client";

import React, { Fragment } from "react";
import { Box, Divider, Typography, ButtonBase } from "@mui/material";

import { useGetAllTasks } from "@todolist/core/api/ToDo";
import StyledBadge from "@todolist/styles/styledBadge";
import { CategoryChipsProps, CategoryType } from "@todolist/core/models/category.models";
import { getCategoryStats } from "@todolist/lib/categoryStats";


export interface ICategoryChipsProps {
  tasks: any[];
  date: Date;
  selectedCategory: string;
  onCategoryChange: (category: CategoryType) => void;
}

export const CategoryChips =  ({
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
        flexWrap: "nowrap",
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
                gap: 2,
                pr: 2,
                borderRadius: 1,
                bgcolor: "transparent",
              }}
            >
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  color:
                    selectedCategory === stat.label ? "#0760FB" : "inherit",
                }}
              >
                {stat.label}
              </Typography>
              <StyledBadge
                badgeContent={<>{stat.count ?? 2}</>}
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
