module.exports = {
  up: function (queryInterface, Sequelize) {
      // Setup foreign key constraints.
      return Promise.all([
        queryInterface.addConstraint('Items', ['category_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'ItemCategories',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('ItemModels', ['item_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Items',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('ItemModels', ['model_no'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Models',
            field: 'no'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('ItemsIns', ['item_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Items',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('ItemsIns', ['vendor_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Vendors',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('SerialNos', ['items_in_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'ItemsIns',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('SerialNoProcesses', ['process_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Processes',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('SerialNoProcesses', ['serial_no_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'SerialNos',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      ]);
  },

  down: function (queryInterface, Sequelize) {

    return Promise.all([
      queryInterface.removeConstraint('Items', 'Items_category_id_ItemCategories_fk'),
      queryInterface.removeConstraint('ItemModels', 'ItemModels_item_id_Items_fk'),
      queryInterface.removeConstraint('ItemModels', 'ItemModels_model_no_Models_fk'),
      queryInterface.removeConstraint('ItemsIns', 'ItemsIns_item_id_Items_fk'),
      queryInterface.removeConstraint('ItemsIns', 'ItemsIns_vendor_id_Vendors_fk'),
      queryInterface.removeConstraint('SerialNos', 'SerialNos_items_in_id_ItemsIns_fk'),
      queryInterface.removeConstraint('SerialNoProcesses', 'SerialNoProcesses_process_id_Processes_fk'),
      queryInterface.removeConstraint('SerialNoProcesses', 'SerialNoProcesses_serial_no_id_SerialNos_fk')
    ]);
  }
};
