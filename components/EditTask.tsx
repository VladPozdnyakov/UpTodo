import React from 'react';
import {View, TextInput, Button, StyleSheet, Modal, Text} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

interface propsType {
  hideModal: Function;
  onEditItem: Function;
  id: string;
  text: string;
  header: string;
}

interface valuesType {
  editHeader: string;
  text: string;
  id: string;
}

function EditTask(props: propsType) {
  function postEditTask(values: valuesType) {
    props.onEditItem(values, props.id);
  }

  const addTaskValidationSchema = yup.object().shape({
    editHeader: yup
      .string()
      .max(42, ({max}) => `Header must be at least ${max} characters`)
      .required('Header is Required'),
    text: yup
      .string()
      .max(200, ({max}) => `Goal must be at least ${max} characters`)
      .required('Goal is required'),
  });

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Formik
          // validationSchema={addTaskValidationSchema}
          initialValues={{
            editHeader: props.header,
            editText: props.text,
            editId: props.id,
          }}
          validateOnBlur
          onSubmit={postEditTask}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
              <TextInput
                name="editHeader"
                style={styles.textInput}
                placeholder="Header"
                onChangeText={handleChange('editHeader')}
                onBlur={handleBlur('editHeader')}
                value={values.editHeader}
              />
              {errors.editHeader && touched.editHeader && (
                <Text style={{fontSize: 14, color: 'red'}}>
                  {errors.editHeader}
                </Text>
              )}
              <TextInput
                name="text"
                style={styles.textInput}
                placeholder="Your course goal!"
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                value={values.text}
              />
              {errors.text && touched.text && (
                <Text style={{fontSize: 14, color: 'red'}}>{errors.text}</Text>
              )}
              <TextInput
                style={styles.textInput}
                placeholder="Your id"
                onChangeText={handleChange('editId')}
                onBlur={handleBlur('editId')}
                value={values.editId}
              />

              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button title="Edit" onPress={handleSubmit} color="#b180f0" />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Cancel"
                    onPress={props.hideModal}
                    color="#f31282"
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </Modal>
  );
}

export default EditTask;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#311b6b',
  },
  textInput: {
    margin: 10,
    height: 50,
    width: '100%',
    padding: 16,
    backgroundColor: '#feecef',
    borderColor: '#feecef',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    marginHorizontal: 8,
    width: '30%',
  },
  error: {
    fontSize: 10,
    color: 'red',
  },
});
