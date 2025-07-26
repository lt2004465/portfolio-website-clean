'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CategoryFilterProps } from '@/types';
import Button from './Button';

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === undefined ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange(undefined)}
        className="mb-2"
      >
        全部
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="mb-2"
          style={
            category.color
              ? {
                  backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                  borderColor: category.color,
                  color: selectedCategory === category.id ? '#fff' : category.color,
                }
              : undefined
          }
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter; 