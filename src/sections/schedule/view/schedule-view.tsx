import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

// Add the plugin
dayjs.extend(isBetween);

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';

import { paths } from 'src/routes/paths';
import { CalendarForm } from '../calendar-form';
// ----------------------------------------------------------------------

export function ScheduleView() {
  const calendarRef = useRef<FullCalendar>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [events, setEvents] = useState([
    {
      id: '1',
      resourceId: 'a',
      title: 'Client Meeting',
      start: '2025-06-20T10:00:00',
      end: '2025-06-20T11:00:00',
      backgroundColor: '#00A76F',
    },
    {
      id: '2',
      resourceId: 'b',
      title: 'Project Review',
      start: '2025-06-20T14:00:00',
      end: '2025-06-20T16:30:00',
      backgroundColor: '#FF5630',
    },
  ]);

  const [resources, setResources] = useState([
    {
      id: 'a',
      title: 'member 1',
      team: 'team 1',
    },
    {
      id: 'b',
      title: 'member 2',
      team: 'team 2',
    },
    {
      id: 'c',
      title: 'member 3',
      team: 'team 3',
    },
  ]);

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Please enter a title for your event');
    if (title) {
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();

      const newEvent = {
        id: Date.now().toString(),
        resourceId: selectInfo.resource?.id || 'a',
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        backgroundColor: '#00A76F',
      };

      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
      setEvents(events.filter((event) => event.id !== clickInfo.event.id));
    }
  };

  const handleDateChange = (newDate: any) => {
    if (newDate && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(newDate.toDate());
      setSelectedDate(newDate);
    }
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Schedule"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Schedule' }]}
        action={
          <Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>
            Add Event
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography variant="h6">Timeline Schedule</Typography>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <DatePicker label="Go to Date" value={selectedDate} onChange={handleDateChange} />
              </Box>
            </Box>

            <Box sx={{ height: 600 }}>
              <FullCalendar
                ref={calendarRef}
                plugins={[resourceTimelinePlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: '',
                }}
                initialView="resourceTimelineDay"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={events}
                resources={resources}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventDrop={(info) => {
                  console.log('Event dropped:', info.event);
                }}
                eventResize={(info) => {
                  console.log('Event resized:', info.event);
                }}
                height="100%"
                slotMinWidth={100}
                resourceAreaWidth="15%"
                resourceAreaHeaderContent="Teams"
                resourceGroupField="team"
                // resourceLaneDidMount={(arg: any) => {
                //   // Hide specific resources by adding CSS classes
                //   const resourceEls = arg.el.querySelectorAll('.fc-resource');
                //   resourceEls.forEach((el: any) => {
                //     const resourceId = el.getAttribute('data-resource-id');
                //     if (resourceId === 'a' || resourceId === 'b' || resourceId === 'c') {
                //       (el as HTMLElement).style.display = 'none';
                //     }
                //   });
                // }}
              />
            </Box>
          </Stack>
        </Box>
      </Card>
    </DashboardContent>
  );
}
