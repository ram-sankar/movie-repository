import _ from 'lodash';

export function paginate(movies, pageSize, pageNumber)
{
    const startIndex = (pageNumber - 1)*pageSize;
    return _(movies).slice(startIndex).take(pageSize).value();
}