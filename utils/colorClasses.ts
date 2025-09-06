export type ColorVariant =
  | 'orange'
  | 'emerald'
  | 'blue'
  | 'purple'
  | 'red'
  | 'indigo';

export interface ColorClasses {
  bgColor: string;
  textColor: string;
  buttonColor: string;
  borderColor: string;
}

export const getColorClasses = (color: ColorVariant): ColorClasses => {
  switch (color) {
    case 'orange':
      return {
        bgColor: 'bg-orange-100 group-hover:bg-orange-200',
        textColor: 'text-orange-600 group-hover:text-orange-700',
        buttonColor: 'bg-orange-600 hover:bg-orange-700',
        borderColor: 'hover:border-orange-200',
      };
    case 'emerald':
      return {
        bgColor: 'bg-emerald-100 group-hover:bg-emerald-200',
        textColor: 'text-emerald-600 group-hover:text-emerald-700',
        buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
        borderColor: 'hover:border-emerald-200',
      };
    case 'blue':
      return {
        bgColor: 'bg-blue-100 group-hover:bg-blue-200',
        textColor: 'text-blue-600 group-hover:text-blue-700',
        buttonColor: 'bg-blue-600 hover:bg-blue-700',
        borderColor: 'hover:border-blue-200',
      };
    case 'purple':
      return {
        bgColor: 'bg-purple-100 group-hover:bg-purple-200',
        textColor: 'text-purple-600 group-hover:text-purple-700',
        buttonColor: 'bg-purple-600 hover:bg-purple-700',
        borderColor: 'hover:border-purple-200',
      };
    case 'red':
      return {
        bgColor: 'bg-red-100 group-hover:bg-red-200',
        textColor: 'text-red-600 group-hover:text-red-700',
        buttonColor: 'bg-red-600 hover:bg-red-700',
        borderColor: 'hover:border-red-200',
      };
    case 'indigo':
      return {
        bgColor: 'bg-indigo-100 group-hover:bg-indigo-200',
        textColor: 'text-indigo-600 group-hover:text-indigo-700',
        buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
        borderColor: 'hover:border-indigo-200',
      };
    default:
      return {
        bgColor: 'bg-gray-100 group-hover:bg-gray-200',
        textColor: 'text-gray-600 group-hover:text-gray-700',
        buttonColor: 'bg-gray-600 hover:bg-gray-700',
        borderColor: 'hover:border-gray-200',
      };
  }
};
