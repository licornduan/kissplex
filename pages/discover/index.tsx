import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DiscoverPage(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/discover/nfts`);
  });

  return <></>;
}

export interface DiscoverLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export function DiscoverLayout(props: DiscoverLayoutProps): JSX.Element {
  return (
    <div className={classNames('mt-10', ['flex flex-col px-2', 'md:flex-row md:px-20'])}>
      {props.children}
    </div>
  );
}

interface FiltersSectionProps {
  children: JSX.Element | JSX.Element[];
}

function FiltersSection(props: FiltersSectionProps): JSX.Element {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className={classNames('flex flex-col justify-center', [{ 'basis-[320px]': !collapsed }])}>
      <div title="Show filters">
        <FilterIcon
          className={classNames('mr-2 h-6 w-6', { hidden: !collapsed }, 'hover:cursor-pointer')}
          onClick={() => setCollapsed(false)}
        />
      </div>
      {/* TODO correctly transition the filter menu collapsing */}
      <div className={classNames({ hidden: collapsed }, ['mr-2', 'md:mr-10'])}>
        <div className={classNames('flex flex-col space-y-4')}>
          <span
            className={classNames(
              'flex w-full flex-row flex-nowrap items-center justify-between p-4',
              'border-b border-b-gray-800'
            )}
          >
            <span className="text-2xl">Filters</span>
            <div title="Hide filters">
              <ArrowLeftIcon
                onClick={() => setCollapsed(true)}
                className={classNames('h-6 w-6', { hidden: collapsed }, 'hover:cursor-pointer')}
              />
            </div>
          </span>
          {props.children}
        </div>
      </div>
    </div>
  );
}

DiscoverLayout.FiltersSection = FiltersSection;

export interface FilterOption {
  value: any;
  label: string;
  numberOfItems?: number;
}

interface FilterProps {
  title: string;
  options: FilterOption[];
  onChange: (selected: FilterOption) => void;
  default?: FilterOption;
}

function Filter(props: FilterProps): JSX.Element {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <fieldset>
      <legend
        className={classNames(
          'flex flex-row flex-nowrap items-center justify-between p-4',
          'text-base',
          'hover:cursor-pointer hover:bg-gray-700 focus:bg-gray-700'
        )}
        onClick={() => setCollapsed(!collapsed)}
      >
        {props.title}{' '}
        <ChevronDownIcon className={classNames('ml-2 h-4 w-4', { hidden: !collapsed })} />
        <ChevronUpIcon className={classNames('ml-2 h-4 w-4', { hidden: collapsed })} />
      </legend>

      {/* to "collapse", wrap the filter options in a div that with overflow hidden and then move the options up */}
      <div className="overflow-hidden">
        <div
          className={classNames({ '-mt-[100%]': collapsed }, 'transition-all duration-300 ease-in')}
        >
          {props.options.map((o) => makeOption(o, props.title, props.onChange))}
        </div>
      </div>
    </fieldset>
  );

  function makeOption(
    option: FilterOption,
    filterName: string,
    onSelect: (o: FilterOption) => void
  ): JSX.Element {
    const id: string = `filter-${filterName}-${option.value}`;
    return (
      <div
        key={id}
        className={classNames(
          'flex flex-row flex-nowrap items-center space-x-4 p-4',
          'w-full',
          'hover:underline'
        )}
      >
        <input
          onChange={() => onSelect(option)}
          className={classNames('h-3 w-3', [
            '!bg-gray-800 !outline !outline-0 !outline-gray-500 !ring-1 !ring-gray-500 !ring-offset-0 !ring-offset-transparent',
            'checked:!bg-white',
          ])}
          type="radio"
          name={filterName}
          id={id}
        />
        <label htmlFor={id} className={classNames('flex-grow', 'text-base')}>
          {option.label}
        </label>
        <span className={classNames('text-base')}>{option.numberOfItems?.toLocaleString()}</span>
      </div>
    );
  }
}

FiltersSection.Filter = Filter;

interface MainContentSectionProps {
  children: JSX.Element | JSX.Element[];
}

function MainContentSection(props: MainContentSectionProps): JSX.Element {
  return <div className="flex flex-grow border border-white">{props.children}</div>;
}

DiscoverLayout.MainContentSection = MainContentSection;
