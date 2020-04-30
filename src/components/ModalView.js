import React, {useState, useEffect} from 'react';

import {Dimensions, View} from 'react-native';

import {CustomPicker} from 'react-native-custom-picker';
import Modal from 'react-native-modal';

import Text from './base/Text';
import ActionButton, {ActionButtonTitle} from './ActionButton';
import Column from './base/Column';
import Row from './base/Row';

import theme from '../utils/theme';

// TODO : Reduxu bağla, dispacth ile verileri state'e kaydet

const ModalView = ({visible, loading, setVisible, categories}) => {
  const [difficulty, setDifficulty] = useState('easy');
  const [category, setCategory] = useState([]);

  // Only categories labels
  const editedCategory = categories.map((category) => category.label);

  // Get selected category id
  const getCategoryId = (selectedCategory) =>
    categories.find((cat) => cat.label === selectedCategory);

  const selectedCategoryId = getCategoryId(category);

  // Custom Picker Settings

  const renderHeader = () => {
    return (
      <Row justifyContent="flex-start" m={10}>
        <Text fontSize={18} fontFamily="Poppins-Medium" color="purple">
          All Categories
        </Text>
      </Row>
    );
  };

  const renderField = (settings) => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <View>
        <View>
          {!selectedItem && (
            <View>
              <Text color="blue">{defaultText}</Text>
            </View>
          )}
          {selectedItem && (
            <View>
              <Text color="blue">{getLabel(selectedItem)}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderOption = (settings) => {
    const {item, getLabel} = settings;
    return (
      <Row justifyContent="flex-start" m={10} borderRadius={8}>
        <Text fontSize={16} color="black">
          {getLabel(item)}
        </Text>
      </Row>
    );
  };

  return (
    <Column bg="red">
      <Modal isVisible={visible}>
        <Column bg="white" p={20} borderRadius={8}>
          <Text fontFamily="Poppins-Bold" fontSize={24} color="black">
            LET'S CREATE A QUIZ!
          </Text>

          <Row
            justifyContent="space-evenly"
            width={Dimensions.get('window').width / 2}
            m={10}>
            <Text fontFamily="Poppins-Medium" color="black" mr={80}>
              Difficulty
            </Text>
            <CustomPicker
              placeholder="Select Difficulty"
              options={['Easy', 'Medium', 'Hard']}
              fieldTemplate={renderField}
              optionTemplate={renderOption}
              headerTemplate={renderHeader}
              onValueChange={(value) => {
                setDifficulty(value.toLowerCase());
              }}
            />
          </Row>

          <Row
            justifyContent="space-evenly"
            width={Dimensions.get('window').width / 2}>
            <Text fontFamily="Poppins-Medium" color="black" mr={80}>
              Category
            </Text>

            {loading === true ? (
              <Text> Loading... </Text>
            ) : (
              <CustomPicker
                placeholder="Select Category"
                options={editedCategory}
                fieldTemplate={renderField}
                optionTemplate={renderOption}
                headerTemplate={renderHeader}
                onValueChange={(value) => {
                  setCategory(value);
                }}
              />
            )}
          </Row>

          <ActionButton
            borderRadius={30}
            mt={20}
            onPress={() => setVisible(!visible)}
            bg="purple">
            <ActionButtonTitle color="white">START QUIZ</ActionButtonTitle>
          </ActionButton>
        </Column>
      </Modal>
    </Column>
  );
};

export default ModalView;