import React, {useState} from 'react';
import {View, TouchableOpacity,Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};
const currentDate=()=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    console.log(yyyy+'-'+mm+'-'+dd)
    return yyyy+'-'+mm+'-'+dd
}
const Schedule: React.FC = () => {
    const [items, setItems] = useState({'2021-04-20':[{time:'16:00',name:'sam'}],'2021-04-21':[{time:'15:00',name:'sam'},{time:'17:00',name:'dvir'}]});
    type item={
        time: string;
        name: string;
    }

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };

    const renderItem = (item) => {
        // @ts-ignore
        return (
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Avatar.Text label={item.name} />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text>event: {item.name}</Text>
                                <Text>teacher: {item.name}</Text>
                            </View>
                            <Text>{item.time}</Text>

                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1}}>
            <Agenda
                items={items}
                pastScrollRange={12}
                futureScrollRange={12}
                selected={currentDate()}
                renderItem={renderItem}
            />
            <Avatar.Text label={'+'} />
        </View>
    );
};

export default Schedule;
