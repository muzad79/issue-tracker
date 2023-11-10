import { Skeleton } from '@/app/components'
import { Table } from '@radix-ui/themes'
import IssueActions from './issues/IssueActions'

const loading = () => {
  const issues = [1, 2, 3, 4, 5]
  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell><Skeleton />
                <div className='block md:hidden'><Skeleton /></div>
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table.Root>
    </div>
  )
}

export default loading